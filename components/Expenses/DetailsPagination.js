"use client";

import styles from "./DetailsPagination.module.scss";

export default function DetailsPagination({ expensesAmount }) {
  let howManyPages = Math.ceil(expensesAmount / 6);

  return (
    <div className={styles.paginationBox}>
      <div className={styles["pagination-item"]}>1</div>
      <div className={styles["pagination-item"]}>2</div>
      <div className={styles["pagination-item"]}>3</div>
    </div>
  );
}
