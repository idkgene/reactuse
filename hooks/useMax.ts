import { useCallback, useEffect, useState } from "react";

/**
 * A custom React hook that returns the maximum value.
 * @param {number[]} numbers - An array of numbers.
 * @returns {[number, (newNumbers: number[]) => void]} An array containing the maximum value and a function to update the maximum value.
 */
const useMax = (numbers: number[]) => {
  const [max, setMax] = useState<number>(Math.max(...numbers));

  const updateMax = useCallback((newNumbers: number[]) => {
    setMax(Math.max(...newNumbers));
  }, []);

  useEffect(() => {
    updateMax(numbers);
  }, [numbers, updateMax]);

  return [max, updateMax];
};

export { useMax };
