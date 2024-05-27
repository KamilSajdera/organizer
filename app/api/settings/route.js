"use server";

import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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
    : (updateData = {
        $set: {
          username: data.value,
        },
      });

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );
  const db = client.db();
  const usersCollection = db.collection("users");
  const updateResult = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    updateData
  );

  client.close();

  return NextResponse.json({ message: "ok!" });
}

export async function updateUserData(id, editedField, value) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAGE_URL}/api/settings?id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editedField, value}),
      }
    );

    revalidatePath("/", 'layout');
}