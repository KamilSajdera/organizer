"use server";

function isEmptyField(text) {
  return !text || text.trim() === "";
}

export async function addTask(prevState, formData) {
  const newTask = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    priority: formData.get("priority"),
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
}
