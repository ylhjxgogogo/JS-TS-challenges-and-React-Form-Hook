import React from "react";
import { useDispathTask } from "./TaskProvider";
import { useState } from "react";
const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispathTask();
  const handleDel = () => {
    dispatch({
      type: "delete",
      id: task.id,
    });
  };
  let renderContent = null;
  if (isEditing) {
    renderContent = (
      <>
        <input
          type="text"
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "edit",
              id: task.id,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    renderContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <>
      {renderContent}

      <button onClick={handleDel}>Delete</button>
      <hr />
    </>
  );
};

export default Task;
