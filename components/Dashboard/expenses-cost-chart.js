"use client";

import { useState, useEffect } from "react";
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

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
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

    setChartOptions({
      data: lastMonthsName.map((month, index) => ({
        month,
        userExpense: lastCostsAmount[index],
      })),
      series: [
        {
          type: "line",
          xKey: "month",
          yKey: "userExpense",
          label: {
            formatter: ({ value }) => `${value}$`,
            color: "#aaa",
          },
          marker: {
            fill: "#9772bb",
            size: 13,
            stroke: "#141319",
            strokeWidth: 3,
            shape: "diamond",
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
              { stroke: "#424046" },
              { stroke: "#565656", lineDash: [5, 5] },
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
  }, [currentMonth, expenses]);

  function handleChangeRange(action) {

    if(action === "prev")
      setCurrentMonth((month) => (month - 1 + 12) % 12);

    if(action === "next")
      setCurrentMonth((month) => (month + 1 + 12) % 12);
  }

  return (
    <section className={styles.expensesChartContainer}>
      <h3>Goals & Expenses</h3>
      {chartOptions.data && (
        <AgCharts options={chartOptions} className={styles.chart} />
      )}
      <button
        className={styles.button}
        onClick={() => handleChangeRange("prev")}
      >
        Prev
      </button>
      <button
        className={styles.button}
        onClick={() => handleChangeRange("next")}
      >
        Next
      </button>
    </section>
  );
}
