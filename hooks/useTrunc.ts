import { useState, useCallback } from "react";

/**
 * A custom React hook that returns a truncated number.
 * @param {number} number - The number to be truncated.
 * @returns {[number | null, (number: number) => void]} An array containing the truncated number and a function to truncate the number.

 */
const useTrunc = () => {
  const [result, setResult] = useState<number>(0);

  const truncateNumber = useCallback((number: number) => {
    if (typeof number !== "number") {
      console.error("useTrunc: Input must be a number otherwise it'll return NaN");
      return;
    }
    setResult(Math.trunc(number));
  }, []);

  return [result, truncateNumber];
};

export default useTrunc;
