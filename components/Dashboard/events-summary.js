import Link from "next/link";
import styles from "./events-summary.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function EventsSummary({ events }) {
  events.sort(
    (eventA, eventB) => new Date(eventA.start) - new Date(eventB.start)
  );

  let filteredEvents = events
    .filter((event) => new Date(event.start) >= new Date())
    .slice(0, 3);

  function formatEventTime(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    const sameDay =
      startDate.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }) ===
      endDate.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
  
    const startTime = startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const isEventAllDay = !start.includes("T");
  
    if (!end && !isEventAllDay) return `${startTime}`;

    if(isEventAllDay) return `All day`
  
    if (sameDay) {
      const endTime = endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `${startTime} - ${endTime}`;
    }
  
    const endDateStr = endDate.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    return `${startTime} - ${endDateStr} ${endTime}`;
  }

  return (
    <section className={styles.events}>
      {filteredEvents.map((event) => (
        <div className={styles["event-item"]} key={event._id}>
          <h4>{event.title}</h4>
          <p className={styles["event-item_date"]}>
            {new Date(event.start).toLocaleDateString("pl-PL")}
          </p>
          <p className={styles["event-item_hours"]}>
            <FontAwesomeIcon icon={faClock} />
            {formatEventTime(event.start, event.end)}
          </p>
        </div>
      ))}
      {filteredEvents.length < 2 && (
        <div className={styles.banner}>
          <h2>Create your event!</h2>
          <p>Go to calendar view and customize your event.</p>
          <button>
            <Link href="/calendar">Go to calendar</Link>
          </button>
        </div>
      )}
    </section>
  );
}
