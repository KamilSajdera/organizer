import styles from "./active-tasks-sidebar.module.scss";

export default function ActiveTasks({ tasks }) {
  const activeTasks = tasks
    .filter((task) => task.category != "Done")
    .slice(0, 4);

  return (
    <div className={styles["active-tasks"]}>
    
      {activeTasks.map((task) => (
        <div
          className={`${styles.task} ${styles[`priority-${task.priority}`]}`}
          key={task._id}
        >
          <div className={styles["task-desc"]}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div className={styles["task-details"]}>
            <h4>{task.add_date}</h4>
            <div
              className={`${styles["task-priority"]} ${
                styles[`priority-color-${task.priority}`]
              }`}
            >
              {task.priority}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
