"use server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId || userId.trim().length === 0)
    return NextResponse.json("Syntax error: no user ID given");

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
  );
  const db = client.db();

  const eventsCollection = db.collection("events");
  const response = eventsCollection.find({
    userId: userId,
  });

  const events = await response.toArray();
  client.close();

  return NextResponse.json(events);
}
