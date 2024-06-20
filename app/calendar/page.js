import { verifySession } from "@/lib/session";
import { getEvents, getFilteredEvents } from "@/lib/events";

import CalendarContainer from "@/components/Calendar/CalendarContainer";
import PageHeader from "@/ui/PageHeader";
import SearchResults from "@/components/Calendar/SearchResults";

export default async function CaledarPage({ searchParams }) {
  const session = await verifySession();
  if (!session || !session.isAuth)
    throw new Error("Your session expired. Please sign in again.");

  const { userId } = session;

  const query = searchParams.q;
  const queryExist = query && query?.trim() !== "";

  const events = queryExist
    ? await getFilteredEvents(query)
    : await getEvents(userId);

  return (
    <>
      <PageHeader title="Calendar" />
      {queryExist ? (
        <SearchResults events={events} />
      ) : (
        <CalendarContainer userEvents={events} userId={userId} />
      )}
    </>
  );
}
