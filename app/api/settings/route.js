"use server";

import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { hashUserPassword, verifyPassword } from "@/lib/hash";

export async function PUT(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");

  const body = await req.text();
  const data = JSON.parse(body);

  let updateData;

  data.editedField === "email"
    ? (updateData = {
        $set: {
          email: data.value,
        },
      })
      ? data.editedField === "username"
      : (updateData = {
          $set: {
            username: data.value,
          },
        })
    : (updateData = {
        $set: {
          profile_image: data.value,
        },
      });

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );

  try {
    const db = client.db();
    const usersCollection = db.collection("users");
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      updateData
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: error.toString(),
    });
  } finally {
    client.close();
  }

  return NextResponse.json({ success: true });
}

export async function POST(req) {
  const body = await req.text();

  const data = JSON.parse(body);
  const id = data.id;

  if (!id) {
    return NextResponse.json({
      success: false,
      errorMessage: "Cannot find the user ID!",
    });
  }

  if (data.new_pass !== data.confirm_new_pass) {
    return NextResponse.json({
      success: false,
      errorMessage: "New passwords are different!",
    });
  }

  if (data.new_pass.trim().length < 6) {
    return NextResponse.json({
      success: false,
      errorMessage: "Password must be contains min. 6 characters.",
    });
  }

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );
  const db = client.db();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });

  if (!user) {
    client.close();
    return NextResponse.json({
      success: false,
      errorMessage: "The user cannot be found in the database!",
    });
  }

  const validatePassword = verifyPassword(user.password, data.old_pass);

  if (!validatePassword) {
    client.close();
    return NextResponse.json({
      success: false,
      errorMessage:
        "The password you entered and the user's password are different!",
    });
  }

  const hashEnteredPassword = hashUserPassword(data.new_pass);

  const updateData = {
    $set: {
      password: hashEnteredPassword,
      cPassword: hashEnteredPassword,
    },
  };

  const updateResult = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    updateData
  );
  client.close();

  if (updateResult.modifiedCount >= 1)
    return NextResponse.json({ success: true });
  else
    return NextResponse.json({
      success: false,
      errorMessage: "Something went wrong while change password",
    });
}
