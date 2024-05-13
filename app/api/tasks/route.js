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
