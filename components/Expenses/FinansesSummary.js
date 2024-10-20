"use client";

import { useState, useEffect } from "react";
import styles from "./FinansesSummary.module.scss";

export default function FinansesSummary({ expenses, goals }) {
  const [expensesCost, setExpensesCost] = useState(0);
  const [goalsCost, setGoalsCost] = useState(0);

  useEffect(() => {
    const totalExpenses = calculateCosts(expenses, "expenses");
    setExpensesCost(totalExpenses);

    const totalGoals = calculateCosts(goals, "goals");
    setGoalsCost(totalGoals);
  }, [expenses, goals]);

  function filterCostsByDate(period, event) {
    const today = new Date();
    let filteringDate = new Date(today);
    let filteredExpensesArray = [];
    let filteredGoalsArray = [];

    if (period === "weekly") filteringDate.setDate(today.getDate() - 7);
    else if (period === "monthly") filteringDate.setDate(today.getDate() - 31);
    else if (period === "year") filteringDate.setDate(today.getDate() - 365);
    else {
      filteredExpensesArray = expenses;
      filteredGoalsArray = goals;
    }

    expenses.forEach((expense) => {
      if (new Date(expense.date) < filteringDate) return;
      else filteredExpensesArray.push(expense);
    });

    goals.forEach((goal) => {
      if (new Date(goal.date) < filteringDate) return;
      else filteredGoalsArray.push(goal);
    });

    const totalExpenses = calculateCosts(filteredExpensesArray, "expenses");
    setExpensesCost(totalExpenses);

    const totalGoals = calculateCosts(filteredGoalsArray, "goals");
    setGoalsCost(totalGoals);

    const menuItems = document.querySelectorAll(`.${styles["total-interval-menu_item"]}`);
    menuItems.forEach((item) => item.classList.remove(styles.active));
    
    event.classList.add(styles.active);
  }

  function calculateCosts(array, type) {
    if (type === "expenses")
      return array.reduce((acc, item) => acc + item.amount, 0);
    if (type === "goals")
      return array.reduce((acc, item) => acc + item.collected, 0);
  }

  return (
    <section className={styles["summary-finanses-wrapper"]}>
      <h4>Expenses summary</h4>
      <div className={styles["summary-finanses-items"]}>
        <div className={styles["summary-finanses_item"]}>
          <h5>Expenses</h5>
          <h2>${expensesCost.toFixed(2)}</h2>
        </div>
        <div className={styles["summary-finanses_item"]}>
          <h5>Goals</h5>
          <h2>${goalsCost.toFixed(2)}</h2>
        </div>
        <div className={styles["summary-finanses_item"]}>
          <h5>Total pay in</h5>
          <h2>${(goalsCost + expensesCost).toFixed(2)}</h2>
          <div className={styles["total-interval-menu"]}>
            <div
              className={styles["total-interval-menu_item"]}
              onClick={(event) => filterCostsByDate("weekly", event.target)}
            >
              7 days
            </div>
            <div
              className={styles["total-interval-menu_item"]}
              onClick={(event) => filterCostsByDate("monthly", event.target)}
            >
              Month
            </div>
            <div
              className={styles["total-interval-menu_item"]}
              onClick={(event) => filterCostsByDate("year", event.target)}
            >
              Year
            </div>
            <div
              className={`${styles["total-interval-menu_item"]} ${styles.active}`}
              onClick={(event) => filterCostsByDate(undefined, event.target)}
            >
              All time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
