import styles from "./TasksContainer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function TasksContainer() {
  return (
    <article className={styles.tasksContainer}>
      <section className={styles["task-category"]}>
        <h4>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>ToDo
        </h4>
      </section>
      <section className={styles["task-category"]}>
        <h4>
          <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>In Progress
        </h4>
      </section>

      <section className={styles["task-category"]}>
        <h4>
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Done
        </h4>
      </section>
    </article>
  );
}
