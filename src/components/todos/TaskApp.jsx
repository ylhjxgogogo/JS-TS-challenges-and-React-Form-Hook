import React from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "./TaskProvider";
const TaskApp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TasksProvider>
        <AddTask />
        <br />
        <TaskList />
      </TasksProvider>
    </div>
  );
};

export default TaskApp;
