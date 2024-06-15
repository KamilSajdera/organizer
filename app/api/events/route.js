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

export async function POST(req) {
  const data = await req.json();
  const url = new URL(req.url);
  const id = url.searchParams.get("userId");

  if (!id || id.trim() === "") {
    return NextResponse.json({
      success: false,
      errorMessage: "No userID given!",
    });
  }

  if (!data) {
    return NextResponse.json({
      success: false,
      errorMessage: "No relevant data.",
    });
  }

  try {
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
    );
    const db = client.db();

    const eventsCollection = db.collection("events");
    const response = await eventsCollection.insertOne({
      ...data,
      userId: id,
    });

    client.close();
  } catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: "Something went wrong while saving event in database.",
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;

  if (!id || id.trim() === "") {
    return NextResponse.json({
      success: false,
      errorMessage: "No event ID given!",
    });
  }

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
  );
  const db = client.db();

  const eventsCollection = db.collection("events");
  const response = await eventsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  client.close();

  if (response.deletedCount <= 0) {
    return NextResponse.json({
      success: false,
      errorMessage:
        "We couldn't find an event with the given id in the database",
    });
  }

  return NextResponse.json({ success: true });
}
