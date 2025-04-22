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
            {new Date(event.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {
              // if event.end exist, check if the event will end in the same day,
              //if yes show only time, if not show the day and time
              event.end &&
                (new Date(event.end).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                }) ===
                new Date(event.start).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                })
                  ? ` - ${new Date(event.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : ` - ${new Date(event.end).toLocaleDateString("pl-PL", {
                      day: "2-digit",
                      month: "2-digit",
                    })} ${new Date(event.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`)
            }
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
