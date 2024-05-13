"use server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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
