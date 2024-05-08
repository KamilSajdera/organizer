"use client";
import styles from "./TaskManage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef } from "react";
import { updateCategory, deleteTask } from "@/lib/tasks";

import containerStyles from "./TasksContainer.module.scss";

export default function TaskManage({ id, category }) {
  const manageBoxRef = useRef();
  let tasksContainer;

  useEffect(() => {
    tasksContainer = document.querySelector(
      `.${containerStyles.tasksContainer}`
    );
    function handleClickOutside(event) {
      if (
        manageBoxRef.current &&
        !manageBoxRef.current.contains(event.target)
      ) {
        manageBoxRef.current.classList.remove(styles.open);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [manageBoxRef]);

  const openBoxHandle = () => {
    if (!manageBoxRef.current.classList.contains(styles.open))
      manageBoxRef.current.classList.add(styles.open);
    else manageBoxRef.current.classList.remove(styles.open);
  };

  const availableCategory = ["ToDo", "InProgress", "Done"].filter(
    (item) => item !== category
  );

  async function changeTaskCategoryHandle(category) {
    tasksContainer.classList.add(containerStyles.taskMoving);
    await updateCategory(id, category);

    setTimeout(() => {
      tasksContainer.classList.remove(containerStyles.taskMoving);
    }, 500);
  }

  async function deleteTaskHandle() {
    tasksContainer.classList.add(containerStyles.taskMoving);
    await deleteTask(id);
    setTimeout(() => {
      tasksContainer.classList.remove(containerStyles.taskMoving);
    }, 500);
  }

  return (
    <div className={styles["task-item_manage"]} onClick={() => openBoxHandle()}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
      <ul className={styles["manage-box"]} ref={manageBoxRef}>
        <li onClick={() => changeTaskCategoryHandle(availableCategory[0])}>
          <FontAwesomeIcon icon={faArrowRight} /> {availableCategory[0]}
        </li>
        <li onClick={() => changeTaskCategoryHandle(availableCategory[1])}>
          <FontAwesomeIcon icon={faArrowRight} /> {availableCategory[1]}
        </li>
        <li>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </li>
        <li onClick={() => deleteTaskHandle()}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </li>
      </ul>
    </div>
  );
}
