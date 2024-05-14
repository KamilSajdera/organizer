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

  const response = await fetch(
    `http://localhost:3000/api/tasks?userId=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }
  );

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function getUserTasks(id, key) {
  let userTasks = [];

  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks?userId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );
    userTasks = await response.json();
    if (userTasks?.error) {
      throw new Error(userTasks.error);
    }
  } catch (error) {
    console.error("An error occured! ", error);
    throw new Error(error);
  }

  return { userTasks };
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    revalidatePath("/tasks");
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCategory(id, categoryName) {
  const response = await fetch(
    `http://localhost:3000/api/tasks?id=${id}&category=${categoryName}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidatePath("/tasks");
}
