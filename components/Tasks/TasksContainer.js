import styles from "./TasksContainer.module.scss";

import { faCheck, faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";

import TaskCategory from "./TaskCategory";
import { verifySession } from "@/lib/session";
import { cookies } from "next/headers";

export default async function TasksContainer() {
  const { userId } = await verifySession();
  const { value: userKey } = cookies().get("session");

  let userTasks = [];

  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userKey}`,
        },
      }
    );
    userTasks = await response.json();
    if (userTasks?.error) {
      throw new Error(userTasks.error);
    }
  } catch (error) {
    console.error("An error occured! ", error);
    throw new Error(error);
  }

  const toDoTasks = userTasks.filter((item) => item.category === "ToDo");
  const inProgressTasks = userTasks.filter(
    (item) => item.category === "InProgress"
  );
  const doneTasks = userTasks.filter((item) => item.category === "Done");

  return (
    <article className={styles.tasksContainer}>
      {userTasks.length === 0 && <p>Could not find any tasks...</p>}
      {userTasks.length > 0 && (
        <>
          <TaskCategory name="ToDo" icon={faBars} tasks={toDoTasks} />
          <TaskCategory
            name="In Progress"
            icon={faSpinner}
            tasks={inProgressTasks}
          />
          <TaskCategory name="Done" icon={faCheck} tasks={doneTasks} />{" "}
        </>
      )}
    </article>
  );
}
