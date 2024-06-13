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
