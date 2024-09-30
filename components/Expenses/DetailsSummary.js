"use client";

import { useState } from "react";
import DetailsPagination from "./DetailsPagination";
import styles from "./DetailsSummary.module.scss";

const DUMMY_EXPENSES = [
  {
    id: 1,
    type: "goal",
    goal_id: 1,
    amount: 200,
    date: "30.08.2024",
  },
  {
    id: 2,
    type: "expense",
    name: "Expensive expense",
    amount: 150,
    date: "21.10.2024",
  },
  {
    id: 3,
    type: "expense",
    name: "Something else",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 4,
    type: "goal",
    goal_id: 2,
    amount: 400,
    date: "31.02.2024",
  },
  {
    id: 5,
    type: "expense",
    name: "Something else2",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 6,
    type: "expense",
    name: "Something else 3",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 7,
    type: "expense",
    name: "Something else 4",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 8,
    type: "expense",
    name: "Something else5",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 9,
    type: "expense",
    name: "Something else6",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 10,
    type: "expense",
    name: "Something else7",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 11,
    type: "expense",
    name: "Something else8",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 12,
    type: "expense",
    name: "Something else9",
    amount: 350,
    date: "15.05.2024",
  },
  {
    id: 13,
    type: "expense",
    name: "and mooore",
    amount: 500,
    date: "15.05.2024",
  },
];

const DUMMY_GOALS = [
  {
    id: 1,
    name: "IPHONE 16 PRO",
    amount: 1000,
    collected: 350,
  },
  {
    id: 2,
    name: "New car",
    amount: 15000,
    collected: 3000,
  },
];

export default function DetailsSummary({ expenses }) {
  const [actualPage, setActualPage] = useState(1);

  return (
    <section className={styles["details-wrapper"]}>
      <h4>Details</h4>
      {expenses.slice(actualPage * 6 - 6, actualPage * 6).map((expense) => {
        let goal_details =
          expense.type === "goal" &&
          DUMMY_GOALS.find((goal) => goal.id === expense.goal_id);

        return (
          <div className={styles["detail-item"]} key={expense._id}>
            <h5>{expense.name || goal_details.name}</h5>
            <div className={styles["detail-item_amount"]}>
              + {expense.amount}$
              {goal_details && (
                <p>
                  ({goal_details.collected}$/{goal_details.amount}$)
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
