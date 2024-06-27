import React from "react";
import { useState } from "react";

const Demo2 = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Counter />

      {show && <Counter />}
      <button onClick={() => setShow(!show)}>切换</button>
    </div>
  );
};
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount((count) => count + 1)}>click</button>
    </>
  );
};

export default Demo2;
