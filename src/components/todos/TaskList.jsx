import React from "react";
import Task from "./Task";
import { useTasks } from "./TaskProvider";
const TaskList = () => {
  const state = useTasks();
  //   const dispatch = useDispathTask();
  console.log("taskList");
  return (
    <>
      <ul>
        {state.map((task) => {
          return (
            <li key={task.id}>
              <Task task={task} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TaskList;
