import { useEffect, useState } from "react";

const useSum = (array: number[]): number => {
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    if (!Array.isArray(array)) {
      console.error("useSum: Input must be an array");
      return;
    }

    const total = array.reduce((acc, curr) => acc + curr, 0);
    setSum(total);
  }, [array]);

  return sum;
};

export { useSum };
