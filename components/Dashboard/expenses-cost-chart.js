"use client";

import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import styles from "./expenses-cost-charts.module.scss";

export default function ExpensesCostChart({ expenses }) {
  const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = new Date().getMonth();

  let monthlyCosts = new Array(12).fill(0);

  expenses.forEach((expense) => {
    const monthIndex = new Date(expense.date).getMonth();
    monthlyCosts[monthIndex] += expense.amount;
  });

  let lastCostsAmount = [];
  let lastMonthsName = [];
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    lastMonthsName.push(monthsName[monthIndex]);
    lastCostsAmount.push(monthlyCosts[monthIndex]);
  }

  const [chartOptions, setChartOptions] = useState({
    data: lastMonthsName.map((month, index) => ({
      month,
      userExpense: lastCostsAmount[index],
    })),
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "userExpense",
        fill: "#9772bb",
        label: {
          formatter: ({ value }) => `$${value}`,
        },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          color: "#ccc",
        },
        line: {
          stroke: "#363636",
        },
      },
      {
        type: "number",
        gridLine: {
          style: [
            {
              stroke: "#424046",
              lineDash: [10, 5],
            },
            {
              stroke: "#6a686f",
              lineDash: [5, 5],
            },
          ],
        },
        position: "left",
        label: {
          color: "#ccc",
          fontSize: 14,
          fontWeight: "bold",
          formatter: ({ value }) => `$${value}`,
        },
        line: {
          stroke: "#363636",
        },
      },
    ],
    background: {
      fill: "transparent",
    },
  });

  return (
    <section className={styles.expensesChartContainer}>
      <h3>Goals & Expenses</h3>
      <AgCharts options={chartOptions} className={styles.chart} />
    </section>
  );
}
