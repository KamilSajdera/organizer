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

export default function DetailsSummary() {
  return (
    <section className={styles["details-wrapper"]}>
      <h4>Details</h4>
      {DUMMY_EXPENSES.map((expense) => {
        let goal_details = (expense.type =
          "goal" && DUMMY_GOALS.find((goal) => goal.id === expense.goal_id));

        return (
          <div className={styles["detail-item"]} key={expense.id}>
            <h5>{expense.name || goal_details.name}</h5>
            <div className={styles["detail-item_amount"]}>
              + {expense.amount}$
              {goal_details && (
                <p>
                  ({goal_details.collected}$/{goal_details.amount}$)
                </p>
              )}
            </div>
            <div className={styles["detail-item_date"]}>{expense.date}</div>
          </div>
        );
      })}
    </section>
  );
}
