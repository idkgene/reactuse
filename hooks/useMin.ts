import { useCallback, useEffect, useState } from "react";

/**
 * A custom React hook that returns the minimum value.
 * @param {number[]} numbers - An array of numbers.
 * @returns {[number, (newNumbers: number[]) => void]} An array containing the minimum value and a function to update the minimum value.
 */
const useMin = (numbers: number[]) => {
  const [min, setMin] = useState<number>(Math.min(...numbers));

  const updateMin = useCallback((newNumbers: number[]) => {
    setMin(Math.min(...newNumbers));
  }, []);

  useEffect(() => {
    updateMin(numbers);
  }, [numbers, updateMin]);

  return [min, updateMin];
};

export { useMin };
