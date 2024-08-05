import { useState } from "react";
import styles from "./DetailsPagination.module.scss";

export default function DetailsPagination({ expensesAmount, onChangePage }) {
  const [activePage, setActivePage] = useState(1);
  let howManyPages = Math.ceil(expensesAmount / 6);

  let content = [];

  let handleClickPage = (pageNr) => {
    onChangePage(pageNr);
    setActivePage(pageNr);
  };

  for (let i = 1; i <= howManyPages; i++) {
    content.push(
      <div
        className={`${styles["pagination-item"]} ${
          activePage === i && styles.active
        }`}
        key={i}
        onClick={() => handleClickPage(i)}
      >
        {i}
      </div>
    );
  }

  return <div className={styles.paginationBox}>{content}</div>;
}
