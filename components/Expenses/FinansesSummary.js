import styles from "./FinansesSummary.module.scss";

export default function FinansesSummary() {
  return (
    <section className={styles["summary-finanses-wrapper"]}>
      <h4>Expenses summary</h4>
      <div className={styles["summary-finanses-items"]}>
        <div className={styles["summary-finanses_item"]}>
          <h5>Expenses</h5>
          <h2>$384.30</h2>
        </div>
        <div className={styles["summary-finanses_item"]}>
          <h5>Goals</h5>
          <h2>$120.00</h2>
        </div>
        <div className={styles["summary-finanses_item"]}>
          <h5>Total pay in</h5>
          <h2>$504.30</h2>
          <div className={styles["total-interval-menu"]}>
            <div className={styles["total-interval-menu_item"]}>7 days</div>
            <div className={`${styles["total-interval-menu_item"]} ${styles.active}`}>Month</div>
            <div className={styles["total-interval-menu_item"]}>Year</div>
            <div className={styles["total-interval-menu_item"]}>All time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
