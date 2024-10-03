"use server";

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const data = await req.json();
  const isGoal = data.collected ? true : false;

  const clientUri = isGoal
    ? process.env.NEXT_PUBLIC_MONGODB_GOALS_DATA
    : process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA;

  const collectionName = isGoal ? "expenses_goals" : "expenses";

  if (!data) {
    return NextResponse.json({
      success: false,
      errorMessage: "No data provided for POST method",
    });
  }

  const client = await MongoClient.connect(clientUri);
  try {
    const db = client.db();

    const expensesCollection = db.collection(collectionName);
    const response = await expensesCollection.insertOne(data);
  } catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: `*Database error* ${error.toString()}`,
    });
  } finally {
    client.close();
  }

  return NextResponse.json({ success: true });
}

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const typeOfSearchingData = url.searchParams.get("type");
  let expensesArray = [];

  const clientUri =
    typeOfSearchingData === "goals"
      ? process.env.NEXT_PUBLIC_MONGODB_GOALS_DATA
      : process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA;

  const collectionName =
    typeOfSearchingData === "goals" ? "expenses_goals" : "expenses";

  if (!userId) {
    return NextResponse.json(
      { error: "Internal Server Error: no userID!" },
      { status: 500 }
    );
  }

  const client = await MongoClient.connect(clientUri);

  try {
    const db = client.db();
    const expensesCollection = db.collection(collectionName);
    const response = expensesCollection.find({ userId: userId });

    expensesArray = await response.toArray();
  } catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: error.toString(),
    });
  }

  return NextResponse.json(expensesArray);
}
