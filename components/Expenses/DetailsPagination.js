import { useState } from "react";
import styles from "./DetailsPagination.module.scss";

export default function DetailsPagination({ expensesAmount, onChangePage }) {
  const [activePage, setActivePage] = useState(1);
  const howManyPages = Math.ceil(expensesAmount / 6);

  if (howManyPages <= 1) return;

  const handleClickPage = (pageNr) => {
    onChangePage(pageNr);
    setActivePage(pageNr);
  };

  const getPaginationRange = () => {
    const maxPagesToShow = 3;
    let startPageIndex = Math.max(
      1,
      activePage - Math.floor(maxPagesToShow / 2)
    );
    let endPageIndex = startPageIndex + maxPagesToShow - 1;

    if (endPageIndex > howManyPages) {
      endPageIndex = howManyPages;
      startPageIndex = Math.max(1, endPageIndex - maxPagesToShow + 1);
    }

    return { startPageIndex, endPageIndex };
  };

  const { startPageIndex, endPageIndex } = getPaginationRange();

  const content = [];
  for (let i = startPageIndex; i <= endPageIndex; i++) {
    content.push(
      <div
        className={`${styles["pagination-item"]} ${
          activePage === i ? styles.active : ""
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
