import styles from "./TasksContainer.module.scss";

import { faCheck, faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";

import TaskCategory from "./TaskCategory";
import { getUserTasks } from "@/lib/tasks";
import { verifySession } from "@/lib/session";

const dummyTasks = [
  {
    id: "t1",
    category: "ToDo",
    name: "To Do Task",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    level: "mid",
    date: "20-03-2024",
    add_date: "15-03-2024",
  },
  {
    id: "t2",
    category: "InProgress",
    name: "InProgress Task",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    level: "high",
    date: "27-04-2024",
    add_date: "21-04-2024",
  },
  {
    id: "t3",
    category: "Done",
    name: "Done Task",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    level: "low",
    date: "26-02-2024",
    add_date: "12-02-2024",
  },
];

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
