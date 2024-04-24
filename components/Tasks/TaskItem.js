import styles from "./TaskItem.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function TaskItem({ id, name, desc, level, date, add_date }) {
  return (
    <div className={styles["task-item"]}>
      <h4>{name}</h4>
      <div className={styles["task-item_tiles"]}>
        <div className={`${styles.tile} ${styles[`${level}`]}`}>{level}</div>
        <div className={styles.tile}>
          {date} <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      </div>
      <p className={styles["task-item_description"]}>{desc}</p>
      <div className={styles["task-item_added"]}>
        {add_date} <p>Added</p>
      </div>
    </div>
  );
}
