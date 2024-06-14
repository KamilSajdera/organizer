"use server";

import { revalidatePath } from "next/cache";

export async function getEvents(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAGE_URL}/api/events?userId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!Array.isArray(result)) throw new Error(result);

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function sendEvent(id, prevState, formData) {
  const startString = formData.get("start-hour")
    ? `${formData.get("date")}T${formData.get("start-hour")}:00`
    : formData.get("date");

  const eventData = {
    title: formData.get("title"),
    description: formData.get("description"),
    start: startString,
    end: formData.get("end-hour"),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/events?userId=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }
  );  

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.errorMessage);
  }

  revalidatePath("/calendar");
  return result;
}
