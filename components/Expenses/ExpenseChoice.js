"use client";

import { useState } from "react";
import styles from "./ExpenseChoice.module.scss";

import AddExpenseModal from "./AddExpenseModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import AddGoalModal from "./AddGoalModal";
import GoalsWrapper from "./goals-wrapper";

export default function ExpenseChoice({ userId, userGoals }) {
  const [isShowAddExpenseModal, setIsShowAddExpenseModal] = useState(false);
  const [isShowAddGoalModal, setIsShowAddGoalModal] = useState(false);
  const [isShowUserGoals, setIsShowUserGoals] = useState(false);

  const handleAddExpense = () => setIsShowAddExpenseModal(true);
  const handleCloseExpense = () => setIsShowAddExpenseModal(false);

  const handleAddGoal = () => setIsShowAddGoalModal(true);
  const handleCloseGoal = () => setIsShowAddGoalModal(false);

  const handleShowGoals = () => setIsShowUserGoals(true);
  const handleCloseGoals = () => setIsShowUserGoals(false);

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
        <button
          className={styles["user-actions__show-goals"]}
          onClick={handleShowGoals}
        >
          Goals
        </button>
      </section>
      {isShowAddExpenseModal && (
        <AddExpenseModal
          onCloseExpenseModal={handleCloseExpense}
          userId={userId}
        />
      )}
      {isShowAddGoalModal && (
        <AddGoalModal onCloseGoalModal={handleCloseGoal} userId={userId} />
      )}
      {isShowUserGoals && (
        <GoalsWrapper goals={userGoals} onCloseGoals={handleCloseGoals} />
      )}
    </>
  );
}
