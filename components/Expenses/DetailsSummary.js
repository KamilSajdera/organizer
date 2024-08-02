import styles from "./DetailsSummary.module.scss";

export default function DetailsSummary() {
  return (
    <section className={styles["details-wrapper"]}>
      <h4>Details</h4>
      <div className={styles["detail-item"]}>
        <h5>Title of my goal</h5>
        <div className={styles["detail-item_amount"]}>
          + 200$
          <p>(1200$/1400$)</p>
        </div>
        <div className={styles["detail-item_date"]}>30.08.2024</div>
      </div>
      <div className={styles["detail-item"]}>
        <h5>Expensive expense</h5>
        <div className={styles["detail-item_amount"]}>+ 150$</div>
        <div className={styles["detail-item_date"]}>13.05.2024</div>
      </div>
      <div className={styles["detail-item"]}>
        <h5>Expensive expense2</h5>
        <div className={styles["detail-item_amount"]}>+ 20$</div>
        <div className={styles["detail-item_date"]}>21.10.2023</div>
      </div>
    </section>
  );
}
