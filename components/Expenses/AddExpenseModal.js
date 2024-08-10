import styles from "./AddExpenseModal.module.scss";

export default function AddExpenseModal({ onCloseExpenseModal }) {
  return (
    <div className={styles["addExpense-overlay"]}>
      <div className={styles["addExpense-modal"]}>
        <h3>New expense</h3>
        <form>
          <div className={styles.inputBox}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" required />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="value">Value</label>
            <input type="number" name="value" required />
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={onCloseExpenseModal}
          >
            Close
          </button>
          <button type="submit" className={`${styles.btn} ${styles.add}`}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
