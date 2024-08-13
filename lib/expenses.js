"use server";

export async function addExpense(userId, prev, formData) {
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
}
