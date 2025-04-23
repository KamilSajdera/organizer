"use client";

import { useState } from "react";
import { AgCharts } from "ag-charts-react";

import styles from "./tasks-chart-sidebar.module.scss";
import DashboardBanner from "@/ui/dashboard-banner";

export default function TasksChart({ tasks }) {
  const categoryLabelColors = {
    ToDo: "#dd4b69",
    "In progress": "#82a6c2",
    Done: "#8fc8b6",
  };

  const categoriesCount = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoriesCount).map(
    ([category, count]) => ({
      category,
      count,
      color: categoryLabelColors[category] || "#96c6ff",
    })
  );

  const [chartOptions, setChartOptions] = useState({
    data: chartData,
    series: [
      {
        type: "donut",
        angleKey: "count",
        labelKey: "label",
        innerRadiusRatio: 0.6,
        fills: chartData.map((d) => d.color),
        calloutLabel: {
          enabled: false,
        },
        tooltip: {
          renderer: ({ datum }) => ({
            content: `${datum.category}: ${Math.round(
              (datum.count / tasks.length) * 100
            )}%`,
          }),
        },
        itemStyler: (params) => {
          const { datum } = params;
          const colorMap = {
            ToDo: "#dd4b69",
            "In progress": "#82a6c2",
            Done: "#8fc8b6",
          };

          return {
            fill: colorMap[datum.category] || "#82a6c2",
          };
        },
      },
    ],
    background: {
      fill: "#141319",
    },
    legend: {
      enabled: false,
    },
    padding: {
      top: 10,
      bottom: 20,
      left: 40,
      right: 40,
    },
  });

  return (
    <div className={styles["task-chart-category"]}>
      {tasks.length > 0 && <AgCharts options={chartOptions} />}
      <div className={styles["task-chart-labels"]}>
        {chartData.map((item, index) => (
          <span key={index} style={{ color: item.color, fontWeight: 500 }}>
            {" "}
            {item.category}: {item.count}
            {index < chartData.length - 1 && " |"}
          </span>
        ))}
      </div>
      {tasks.length <= 0 && (
        <DashboardBanner
          title="No data"
          description="Create your fully personalized task."
          href="/tasks"
          button="Add task"
        />
      )}
    </div>
  );
}
