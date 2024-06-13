import CalendarContainer from "@/components/Calendar/CalendarContainer";

import { verifySession } from "@/lib/session";
import { getEvents } from "@/lib/events";

export default async function CaledarPage() {
  const session = await verifySession();
  if (!session || !session.isAuth)
    throw new Error("Your session expired. Please sign in again.");

  const { userId } = session;
  const events = await getEvents(userId);

  return <CalendarContainer userEvents={events} />;
}
