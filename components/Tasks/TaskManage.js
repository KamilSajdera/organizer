"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TaskManage.module.scss";
import containerStyles from "./TasksContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { updateCategory } from "@/lib/tasks";
import DeleteConfirmation from "./DeleteConfirmation";

export default function TaskManage({ id, category }) {
  const [isUserWantDelete, setIsUserWantDelete] = useState(false);
  const manageBoxRef = useRef();
  let tasksContainer;

  const availableCategory = ["ToDo", "InProgress", "Done"].filter(
    (item) => item !== category
  );

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

  async function changeTaskCategoryHandle(category) {
    tasksContainer.classList.add(containerStyles.taskMoving);
    await updateCategory(id, category);

    setTimeout(() => {
      tasksContainer.classList.remove(containerStyles.taskMoving);
    }, 500);
  }

  return (
    <>
      <div
        className={styles["task-item_manage"]}
        onClick={() => openBoxHandle()}
      >
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
          <li onClick={() => setIsUserWantDelete(true)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </li>
        </ul>
      </div>
      {isUserWantDelete && (
        <DeleteConfirmation
          taskId={id}
          onCloseModal={() => setIsUserWantDelete(false)}
        />
      )}
    </>
  );
}
