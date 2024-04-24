import styles from "./TaskManage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default function TaskManage() {
  return (
    <div className={styles["task-item_manage"]}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
      <ul className={styles["manage-box"]}>
        <li><FontAwesomeIcon icon={faArrowRight} /> In Progress</li>
        <li><FontAwesomeIcon icon={faArrowRight} /> Done</li>
        <li><FontAwesomeIcon icon={faPenToSquare} /> Edit</li>
        <li><FontAwesomeIcon icon={faTrash} /> Delete</li>
      </ul>
    </div>
  );
}
