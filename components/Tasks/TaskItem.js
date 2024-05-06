import styles from "./TaskItem.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import TaskManage from "./TaskManage";

export default function TaskItem({ _id, category, title, description, priority, date, add_date }) {
  return (
    <div className={styles["task-item"]}>
      <h4>{title}</h4>
      <TaskManage category={category} id={_id.toString()} />
      <div className={styles["task-item_tiles"]}>
        <div className={`${styles.tile} ${styles[`${priority}`]}`}>{priority}</div>
        <div className={styles.tile}>
          {date} <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      </div>
      <p className={styles["task-item_description"]}>{description}</p>
      <div className={styles["task-item_added"]}>
        {add_date} <p>Added</p>
      </div>
    </div>
  );
}
