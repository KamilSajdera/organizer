import styles from "./ExpenseChoice.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";

export default function ExpenseChoice() {
  return (
    <section className={styles["user-actions"]}>
      <div className={styles["user-actions__item"]}>
        <div className={styles.faBorder}>
          <FontAwesomeIcon icon={faMoneyBillAlt} />
        </div>
        <p>Expense</p>
      </div>
      <div className={styles["user-actions__item"]}>
        <div className={styles.faBorder}>
          <FontAwesomeIcon icon={faHandHoldingDollar} />
        </div>
        <p>Goal</p>
      </div>
    </section>
  );
}
