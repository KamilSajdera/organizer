import styles from "./TasksContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TaskItem from "./TaskItem";

export default function TaskCategory({ name, icon, tasks }) {
  return (
    <section className={styles["task-category"]}>
      <h4>
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        {name}
      </h4>
      {tasks.map((item) => (
        <TaskItem key={item._id.toString()} {...item} />
      ))}
    </section>
  );
}
