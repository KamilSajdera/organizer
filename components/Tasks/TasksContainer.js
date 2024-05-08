import styles from "./TasksContainer.module.scss";

import { faCheck, faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";

import TaskCategory from "./TaskCategory";
import { getUserTasks } from "@/lib/tasks";
import { verifySession } from "@/lib/session";

export default async function TasksContainer() {
  const { userId } = await verifySession();
  const { userTasks } = await getUserTasks(userId);

  const toDoTasks = userTasks.filter(item => item.category === "ToDo");
  const inProgressTasks = userTasks.filter(item => item.category === "InProgress");
  const doneTasks = userTasks.filter(item => item.category === "Done");
  
  return (
    <article className={styles.tasksContainer}>
      <TaskCategory name="ToDo" icon={faBars} tasks={toDoTasks} />
      <TaskCategory name="In Progress" icon={faSpinner} tasks={inProgressTasks} />
      <TaskCategory name="Done" icon={faCheck} tasks={doneTasks} />
    </article>
  );
}
