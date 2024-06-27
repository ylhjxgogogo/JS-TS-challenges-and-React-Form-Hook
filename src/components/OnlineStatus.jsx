import React from "react";
import { useOnlineStatus } from "./hooks";
const OnlineStatus = () => {
  const isOnline = useOnlineStatus();
  return (
    <div>
      <button>{isOnline ? "Save progress" : "disconnected...."}</button>
    </div>
  );
};

export default OnlineStatus;
