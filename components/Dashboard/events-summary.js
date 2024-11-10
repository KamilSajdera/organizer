import styles from "./events-summary.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function EventsSummary({ events }) {
  return (
    <section className={styles.events}>
      <div className={styles["event-item"]}>
        <h4>Gym training with trainer John</h4>
        <p className={styles["event-item_date"]}>20.10.2024</p>
        <p className={styles["event-item_hours"]}>
          <FontAwesomeIcon icon={faClock} />
          15:30 - 17:00
        </p>
      </div>
      <div className={styles["event-item"]}>
        <h4>Important meet</h4>
        <p className={styles["event-item_date"]}>13.12.2024</p>
        <p className={styles["event-item_hours"]}>
          <FontAwesomeIcon icon={faClock} />
          12:00
        </p>
      </div>
      <div className={styles["event-item"]}>
        <h4>Concert orchestra</h4>
        <p className={styles["event-item_date"]}>24.12.2024</p>
        <p className={styles["event-item_hours"]}>
          <FontAwesomeIcon icon={faClock} />
          20:00
        </p>
      </div>
    </section>
  );
}
