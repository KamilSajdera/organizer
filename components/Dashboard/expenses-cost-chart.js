"use client";

import { useState } from "react";
import { AgCharts } from "ag-charts-react";

import styles from "./expenses-cost-charts.module.scss";

export default function ExpensesCostChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  const actualDate = new Date();
  const actualMonthIndex = actualDate.getMonth();

  let displayMonthIndexes = [];

  for (let i = 0; i <= 12; i++) {
    if (actualMonthIndex - i < 0) {
      displayMonthIndexes.push(actualMonthIndex - i + 13);
    } else displayMonthIndexes.push(actualMonthIndex - i);
  }

  const [chartOptions, setChartOptions] = useState({
    data: [
      { month: months[displayMonthIndexes[5]], userExpense: 33 },
      { month: months[displayMonthIndexes[4]], userExpense: 0 },
      { month: months[displayMonthIndexes[3]], userExpense: 50 },
      { month: months[displayMonthIndexes[2]], userExpense: 740 },
      { month: months[displayMonthIndexes[1]], userExpense: 120 },
      { month: months[displayMonthIndexes[0]], userExpense: 300 },
    ],
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
