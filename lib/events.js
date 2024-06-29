"use server";

import { revalidatePath } from "next/cache";

let userEvents = [];

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

    userEvents = await response.json();
    if (!Array.isArray(userEvents)) throw new Error(userEvents);

    return userEvents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFilteredEvents(query) {
  const filteredEvents = userEvents.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return filteredEvents;
}

export async function sendEvent(id, prevState, formData) {
  const isAlldayChecked = formData.get("all-day") === "on";
  const endEventTime = formData.get("end");
  const startEventTime = formData.get("start-hour")
    ? `${formData.get("date")}T${formData.get("start-hour")}:00`.split("+")[0]
    : formData.get("date");

  const eventData = {
    title: formData.get("title"),
    description: formData.get("description"),
    start: startEventTime,
    end: endEventTime,
  };

  if (new Date(endEventTime) < new Date(startEventTime) && !isAlldayChecked) {
    return {
      success: false,
      errorMessage: "The end time is less than the start time!",
    };
  }

  if (
    !isAlldayChecked &&
    (formData.get("start-hour") === null ||
      formData.get("start-hour").trim() === "")
  ) {
    return {
      success: false,
      errorMessage: "You have to set start hour when 'all day' is unchecked",
    };
  }

  if (
    formData.get("title").trim() === "" ||
    formData.get("description").trim() === ""
  ) {
    return {
      success: false,
      errorMessage: "No title or description",
    };
  }

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

export async function deleteEvent(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/events`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  const result = await response.json();

  revalidatePath("/calendar");
}

export async function updateEventDate(data) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/events`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  revalidatePath("/calendar");
}
