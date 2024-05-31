"use server";

import { revalidatePath } from "next/cache";

export async function updateUserData(id, editedField, value) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/settings?id=${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editedField, value }),
    }
  );

  revalidatePath("/", "layout");
}

export async function updateUserPassword(state, formData) {
  const userData = {
    id: formData.get("id"),
    old_pass: formData.get("old_pass"),
    new_pass: formData.get("new_pass"),
    confirm_new_pass: formData.get("repeat_pass"),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/settings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const { success, errorMessage } = await response.json();

  if (!success) return { errorMessage };

  return { success };
}
