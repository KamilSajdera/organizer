"use client";

import { useState } from "react";
import DetailsPagination from "./DetailsPagination";
import styles from "./DetailsSummary.module.scss";

export default function DetailsSummary({ expenses, goals }) {
  const [actualPage, setActualPage] = useState(1);

  let reverseExpenses = expenses.slice().reverse();

  return (
    <section className={styles["details-wrapper"]}>
      <h4>Details</h4>
      {reverseExpenses.length <= 0 && (
        <div className={styles["no-expenses"]}>
          You don't have expenses yet.
        </div>
      )}
      {reverseExpenses
        .slice(actualPage * 6 - 6, actualPage * 6)
        .map((expense) => {
          let goal_details =
            expense.type === "goal" &&
            goals.find((goal) => goal._id === expense.goal_id);

          return (
            <div className={styles["detail-item"]} key={expense._id}>
              <h5>{expense.name || goal_details.title}</h5>
              <div className={styles["detail-item_amount"]}>
                + {expense.amount}$
                {goal_details && (
                  <p>
                    ({expense.newAmount}$/{goal_details.amount}$)
                  </p>
                )}
              </div>
              <div className={styles["detail-item_date"]}>
                {new Date(expense.date).toLocaleDateString("pl-PL", {})}
              </div>
            </div>
          );
        })}
      <DetailsPagination
        expensesAmount={expenses.length}
        onChangePage={(value) => setActualPage(value)}
      />
    </section>
  );
}
