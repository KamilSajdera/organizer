import styles from "./DetailsPagination.module.scss";

export default function DetailsPagination({ expensesAmount, onChangePage }) {
  let howManyPages = Math.ceil(expensesAmount / 6);

  let content = [];

  for (let i = 1; i <= howManyPages; i++) {
    content.push(
      <div
        className={styles["pagination-item"]}
        key={i}
        onClick={() => onChangePage(i)}
      >
        {i}
      </div>
    );
  }

  return <div className={styles.paginationBox}>{content}</div>;
}
