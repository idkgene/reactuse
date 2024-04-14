import React from "react";
import { useDefault } from "@hooks/useDefault";

const ComponentTest = () => {
  const [count, setCount] = useDefault(0);

  const handleClick = () => {
    setCount(undefined); // This will set the count back to the default value of 0
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
};

export default ComponentTest;
