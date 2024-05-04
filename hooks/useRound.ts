import { useState, useCallback } from "react";

/**
 * A custom React hook that returns a rounded number.
 * @param {number} number - The number to be rounded.
 * @returns {[number | null, (number: number) => void]} An array containing the rounded number and a function to round the number.
 */
export const useRound = () => {
  const [result, setResult] = useState<number>(0);

  const roundNumber = useCallback((number: number) => {
    if (typeof number !== "number") {
      console.error("useRound: Input must be a number otherwise it'll return NaN");
      return;
    }
    setResult(Math.round(number));
  }, []);

  return [result, roundNumber];
};