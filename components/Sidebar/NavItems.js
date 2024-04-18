import styles from "./NavItems.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faCalendarDays, faChartSimple, faGears, faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export default function NavItems() {
  return (
    <nav className={styles.mainNav}>
      <div className={styles["mainNav-item"]}>
        <FontAwesomeIcon icon={faHouseChimney} />
        <h5>Dashboard</h5>
      </div>
      <div className={styles["mainNav-item"]}>
        <FontAwesomeIcon icon={faListCheck} />
        <h5>Tasks</h5>
      </div>
      <div className={styles["mainNav-item"]}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <h5>Calendar</h5>
      </div>
      <div className={styles["mainNav-item"]}>
        <FontAwesomeIcon icon={faChartSimple} />
        <h5>Expenses</h5>
      </div>
      <div className={styles["mainNav-item"]}>
        <FontAwesomeIcon icon={faGears} />
        <h5>Settings</h5>
      </div>
    </nav>
  );
}
