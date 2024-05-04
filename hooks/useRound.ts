import { useState } from "react";

/**
 * A custom React hook that returns a rounded number.
 * @param {number} number - The number to be rounded.
 * @returns {[number | null, (number: number) => void]} An array containing the rounded number and a function to round the number.
 */
const useRound = () => {
  const [result, setResult] = useState<number | null>(null);

  const roundNumber = (number: number) => {
    setResult(Math.round(number));
  }

  return [result, roundNumber];
}

export default useRound