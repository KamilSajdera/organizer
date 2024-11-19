import { cookies } from "next/headers";

import styles from "./TasksContainer.module.scss";

import { verifySession } from "@/lib/session";
import { getFilteredTasks, getUserTasks } from "@/lib/tasks";
import TasksView from "./TasksView";

export default async function TasksContainer({ query }) {
  const { userId } = await verifySession();
  const { value: userKey } = cookies().get("session");
  let userTasks = [];

  if (!query || query.trim() === "")
    userTasks = await getUserTasks(userId, userKey);
  else userTasks = await getFilteredTasks(query);

  const toDoTasks = userTasks.filter((item) => item.category === "ToDo");
  const inProgressTasks = userTasks.filter(
    (item) => item.category === "InProgress"
  );
  const doneTasks = userTasks.filter((item) => item.category === "Done");

  return (
    <article className={styles.tasksContainer}>
      {userTasks.length === 0 && <p>Could not find any tasks...</p>}
      {userTasks.length > 0 && (
        <TasksView
          toDoTasks={toDoTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
        />
      )}
    </article>
  );
}
