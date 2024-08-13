"use server";

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const data = await req.json();

  if (!data) {
    return NextResponse.json({
      success: false,
      errorMessage: "No data provided for POST method",
    });
  }

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
  );
  const db = client.db();

  const expensesCollection = db.collection("expenses");
  const response = await expensesCollection.insertOne(data);

  client.close();

  return NextResponse.json({ success: true });
}
