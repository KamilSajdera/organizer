"use client";

import { useEffect, useState } from "react";
import { faCheck, faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";

import TaskCategory from "./TaskCategory";
import MobileNavigation from "./mobile-navigation";

export default function TasksView({ toDoTasks, inProgressTasks, doneTasks }) {
  const [categoryToDisplay, setCategoryToDisplay] = useState(1);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <MobileNavigation
        onChangeCategory={(value) => setCategoryToDisplay(value)}
      />
      {(categoryToDisplay === 1 || width >= 767) && (
        <TaskCategory name="ToDo" icon={faBars} tasks={toDoTasks} />
      )}
      {(categoryToDisplay === 2 || width >= 767) && (
        <TaskCategory
          name="In Progress"
          icon={faSpinner}
          tasks={inProgressTasks}
        />
      )}
      {(categoryToDisplay === 3 || width >= 767) && (
        <TaskCategory name="Done" icon={faCheck} tasks={doneTasks} />
      )}
    </>
  );
}
