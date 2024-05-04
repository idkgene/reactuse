import { useState } from "react";

/**
 * A custom React hook that returns a truncated number.
 * @param {number} number - The number to be truncated.
 * @returns {[number | null, (number: number) => void]} An array containing the truncated number and a function to truncate the number.
 */
const useTrunc = () => {
  const [result, setResult] = useState<number | null>(null);

  const truncateNumber = (number: number) => {
    setResult(Math.trunc(number));
  }

  return [result, truncateNumber];
}

export default useTrunc;