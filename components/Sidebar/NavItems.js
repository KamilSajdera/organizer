import styles from "./NavItems.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCalendarDays,
  faChartSimple,
  faGears,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

import NavLink from "./NavLink";

export default function NavItems() {
  return (
    <nav className={styles.mainNav}>
      <NavLink href="/">
        <FontAwesomeIcon icon={faHouseChimney} />
        <h5>Dashboard</h5>
      </NavLink>

      <NavLink href="/tasks">
        <FontAwesomeIcon icon={faListCheck} />
        <h5>Tasks</h5>
      </NavLink>

      <NavLink href="/calendar">
        <FontAwesomeIcon icon={faCalendarDays} />
        <h5>Calendar</h5>
      </NavLink>

      <NavLink href="/expenses">
        <FontAwesomeIcon icon={faChartSimple} />
        <h5>Expenses</h5>
      </NavLink>

      <NavLink href="/settings">
        <FontAwesomeIcon icon={faGears} />
        <h5>Settings</h5>
      </NavLink>
    </nav>
  );
}
