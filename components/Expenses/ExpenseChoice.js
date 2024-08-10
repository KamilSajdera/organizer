"use client";

import { useState } from "react";
import styles from "./ExpenseChoice.module.scss";

import AddExpenseModal from "./AddExpenseModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";

export default function ExpenseChoice() {
  const [isShowAddExpenseModal, setIsShowAddExpenseModal] = useState(false);
  const [isShowAddGoalModal, setIsShowAddGoalModal] = useState(false);

  const handleAddExpense = () => setIsShowAddExpenseModal(true);
  const handleCloseExpense = () => setIsShowAddExpenseModal(false);

  const handleAddGoal = () => setIsShowAddGoalModal(true);

  return (
    <>
      <section className={styles["user-actions"]}>
        <div
          className={styles["user-actions__item"]}
          onClick={handleAddExpense}
        >
          <div className={styles.faBorder}>
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>
          <p>+ Expense</p>
        </div>
        <div className={styles["user-actions__item"]} onClick={handleAddGoal}>
          <div className={styles.faBorder}>
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <p>+ Goal</p>
        </div>
      </section>
      {isShowAddExpenseModal && (
        <AddExpenseModal onCloseExpenseModal={handleCloseExpense} />
      )}
    </>
  );
}
