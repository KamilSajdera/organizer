"use server";

import { MongoClient, ObjectId } from "mongodb";
import { verifySession } from "./session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isEmptyField(text) {
  return !text || text.trim() === "";
}

export async function addTask(prevState, formData) {
  const add_date = new Date(Date.now()).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });

  const newTask = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    priority: formData.get("priority"),
    category: "ToDo",
    add_date: add_date,
  };

  if (
    isEmptyField(newTask.title) ||
    isEmptyField(newTask.description) ||
    isEmptyField(newTask.date) ||
    isEmptyField(newTask.priority)
  )
    return { message: "One of the fields is empty!" };

  if (newTask.title.length < 4 || newTask.title.length > 20)
    return { message: "Invalid title: min 4, max 20" };

  const { userId } = await verifySession();
  if (!userId) return { message: "Your session has expired! Please sign in." };

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
  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function getUserTasks(id) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_ACTIVITIES_DATA
  );
  const db = client.db();

  const tasksCollection = db.collection("tasks");
  const tasks = await tasksCollection
    .find({
      userId: id,
    })
    .toArray();

  client.close();
  return { userTasks: tasks };
}

export async function updateCategory(id, categoryName) {
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
  revalidatePath("/tasks");
  
}
