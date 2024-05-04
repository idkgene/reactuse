import { useEffect, useState } from "react";

const useSum = (array: number[]) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(array.reduce((acc, curr) => acc + curr, 0));
  }, [array]);

  return sum;
};
