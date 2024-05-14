"use server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { error: "No permissions: unauthorized request!" },
      { status: 401 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Internal Server Error: no userID!" },
      { status: 500 }
    );
  }

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
  );
  const db = client.db();

  const tasksCollection = db.collection("tasks");
  const response = tasksCollection.find({
    userId: userId,
  });

  const tasks = await response.toArray();
  client.close();

  return NextResponse.json(tasks);
}

export async function DELETE(req, res) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
    );

    const db = client.db();
    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });

    client.close();

    if (result.deletedCount <= 0)
      return NextResponse.json({
        success: false,
        errorMessage: "A problem was encountered while deleting the task!",
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, errorMessage: error.toString() },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const body = await req.text();
    const newTask = JSON.parse(body);

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
    );
    const db = client.db();

    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.insertOne({
      ...newTask,
      userId: userId,
    });

    client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, errorMessage: error },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const categoryName = url.searchParams.get("category");

  if (!id) {
    return NextResponse.json({
      success: false,
      errorMessage: "Cannot find ID!",
    });
  }
  if (!categoryName) {
    return NextResponse.json({
      success: false,
      errorMessage: "No category given!",
    });
  }

  try {
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
    );
    const db = client.db();

    const updateData = {
      $set: {
        category: categoryName,
      },
    };
    const tasksCollection = db.collection("tasks");
    const updateResult = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      updateData
    );

    client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      errorMessage: "Something went wrong! " + error,
    });
  }
}
