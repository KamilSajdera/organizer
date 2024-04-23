import styles from "./TaskItem.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function TaskItem({ data }) {
  return (
    <div className={styles["task-item"]}>
      <h4>Awesome Title</h4>
      <div className={styles["task-item_tiles"]}>
        <div className={`${styles.tile} ${styles.mid}`}>Mid</div>
        <div className={styles.tile}>
          13.03.2003 <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      </div>
      <p className={styles["task-item_description"]}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries.
      </p>
      <div className={styles["task-item_added"]}>
        23.04.2024<p>Added</p>
      </div>
    </div>
  );
}
