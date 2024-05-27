"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import styles from "./TaskManage.module.scss";
import containerStyles from "./TasksContainer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { updateCategory, deleteTask } from "@/lib/tasks";

import ConfirmationArea from "@/ui/ConfirmationArea";

export default function TaskManage({ id, category }) {
  const [isUserWantDelete, setIsUserWantDelete] = useState(false);
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [isPendingUpdate, startTransitionUpdate] = useTransition();
  const router = useRouter();
  const manageBoxRef = useRef();

  const availableCategory = ["ToDo", "InProgress", "Done"].filter(
    (item) => item !== category
  );

  useEffect(() => {
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
    startTransitionUpdate(async () => {
      await updateCategory(id, category);
    });
  }

  function deleteHandle() {
    startTransitionDelete(async () => {
      await deleteTask(id);
      setIsUserWantDelete(false);
    });
  }

  useEffect(() => {
    window.history.pushState({}, "", "/tasks");

    let tasksContainer = document.querySelector(
      `.${containerStyles.tasksContainer}`
    );
    if (isPendingUpdate)
      tasksContainer.classList.add(containerStyles.taskMoving);
    else tasksContainer.classList.remove(containerStyles.taskMoving);
  }, [isPendingUpdate, isPendingDelete]);

  return (
    <>
      <div className={styles["task-item_manage"]} onClick={openBoxHandle}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
        <ul className={styles["manage-box"]} ref={manageBoxRef}>
          <li onClick={() => changeTaskCategoryHandle(availableCategory[0])}>
            <FontAwesomeIcon icon={faArrowRight} /> {availableCategory[0]}
          </li>
          <li onClick={() => changeTaskCategoryHandle(availableCategory[1])}>
            <FontAwesomeIcon icon={faArrowRight} /> {availableCategory[1]}
          </li>
          <li onClick={() => router.push(`/tasks/edit?id=${id}`)}>
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </li>
          <li onClick={() => setIsUserWantDelete(true)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </li>
        </ul>
      </div>
      {(isPendingDelete || isUserWantDelete) && (
        <ConfirmationArea
          onConfirmation={deleteHandle}
          onClose={() => setIsUserWantDelete(false)}
        >
          Are you sure you want to delete this task? This operation cannot be
          undone!
        </ConfirmationArea>
      )}
    </>
  );
}
