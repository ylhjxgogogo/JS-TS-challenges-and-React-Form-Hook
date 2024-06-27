import React from "react";
import { useDispathTask } from "./TaskProvider";
import { useState } from "react";
let nextId = 3;
const AddTask = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispathTask();
  const handleAdd = () => {
    dispatch({
      type: "add",
      id: nextId++,
      text: value,
    });
    setValue("");
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTask;
