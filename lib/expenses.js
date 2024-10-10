"use server";

import { revalidatePath } from "next/cache";

export async function addExpense(userId, isGoal, prev, formData) {
  const data = {
    userId: userId,
    type: "expense",
    name: formData.get("title"),
    amount: formData.get("value"),
    date: new Date(),
  };

  if (!data.name || data.name.trim().length <= 0) {
    return {
      success: false,
      errorMessage: "Complete the title!",
    };
  }

  if (!data.amount || parseInt(data.amount) <= 0) {
    return {
      success: false,
      errorMessage: "Bad value!",
    };
  }

  if (!data.userId) {
    return {
      success: false,
      errorMessage: "Cannot find the user ID!",
    };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!result.success) {
    return {
      success: false,
      errorMessage: result.errorMessage,
    };
  }

  revalidatePath("/expenses");
  return { success: true };
}

export async function addGoal(userId, prev, formData) {
  const data = {
    userId: userId,
    title: formData.get("title"),
    amount: parseInt(formData.get("value")),
    collected: parseInt(formData.get("owned")),
    date: new Date(),
  };

  if (data.title.trim().length < 3) {
    return {
      success: false,
      errorMessage: "Min. 3 characters in title!",
    };
  }

  if (!data.amount || data.amount <= 0) {
    return {
      success: false,
      errorMessage: "Amount must be grather than 0!",
    };
  }

  if (data.amount < data.collected) {
    return {
      success: false,
      errorMessage: "Collected value cannot be grather than amount!",
    };
  }

  if (data.collected < 0) {
    return {
      success: false,
      errorMessage: "Collected amount cannot be lower than 0!",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  revalidatePath("/expenses");
  return result;
}

export async function getUserExpenses(userId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/expenses?userId=${userId}&type=expenses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  return result;
}

export async function getUserGoals(userId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/expenses?userId=${userId}&type=goals`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  return result;
}

export async function updateGoal(userId, goalId, amount) {
  const data = {
    userId,
    goalId,
    amount: parseInt(amount),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAGE_URL}/api/expenses`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  revalidatePath("/goals");
  return result;
}
