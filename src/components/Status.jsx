import React, { useState } from "react";
function fetch(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer !== "星期三") {
        reject(new Error("你的答案错误！"));
      }
      resolve();
    }, 1500);
  });
}
const Status = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  if (status === "success") {
    return <h1>恭喜你！回答正确</h1>;
  }
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submiting");
    try {
      await fetch(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err.message);
    } finally {
      setAnswer("");
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h2>今天星期几</h2>
        <textarea
          value={answer}
          onChange={handleChange}
          placeholder="请输入你的答案"
          disabled={status === "submiting"}
        />
        <hr />
        <button
          type="submit"
          disabled={!answer.length || status === "submiting"}
        >
          {status === "submiting" ? "loading" : "submit"}
        </button>
        {error !== null && <p className="text text-danger">{error}</p>}
      </form>
    </>
  );
};

export default Status;
