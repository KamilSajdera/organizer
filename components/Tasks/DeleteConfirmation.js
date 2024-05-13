import { useState } from "react";
import styles from "./DeleteConfirmation.module.scss";
import { deleteTask } from "@/lib/tasks";

export default function DeleteConfirmation({ taskId, onCloseModal }) {
  const [isDeleting, setIsDeleting] = useState();
  async function deleteHandle() {
    setIsDeleting(true);
    const result = await deleteTask(taskId);
    onCloseModal();
    setIsDeleting(false);
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Delete task</h3>
        <p>
          Are you sure you want to delete this task? This operation cannot be
          undone!
        </p>
        <button
          className={`${styles.button} ${styles["button-delete"]}`}
          style={isDeleting ? { background: "#e77070" } : {}}
          onClick={deleteHandle}
        >
          {isDeleting ? "Deleting" : "Delete"}
        </button>
        <button className={styles.button} onClick={onCloseModal}>
          Back
        </button>
      </div>
    </div>
  );
}
