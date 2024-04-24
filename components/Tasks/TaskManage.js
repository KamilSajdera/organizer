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

export default function TaskManage() {
  const manageBoxRef = useRef();

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

  return (
    <div className={styles["task-item_manage"]} onClick={() => openBoxHandle()}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
      <ul className={styles["manage-box"]} ref={manageBoxRef}>
        <li>
          <FontAwesomeIcon icon={faArrowRight} /> In Progress
        </li>
        <li>
          <FontAwesomeIcon icon={faArrowRight} /> Done
        </li>
        <li>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </li>
        <li>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </li>
      </ul>
    </div>
  );
}
