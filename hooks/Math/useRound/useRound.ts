import { useState, useCallback } from 'react';
import type { RoundNumberFn } from '../math';

/**
 * Rounds a number to the nearest integer
 *
 * @param {number} [initialValue=0] - The initial value of the rounded number. Defaults to 0.
 * @returns {[number, RoundedNumberFn]} An array containing the current rounded number and a function to update it.
 *
 * @example
 * const [roundedNumber, roundNumber] = useRound();
 * console.log(roundedNumber); // Output: 0
 * roundNumber(3.7);
 * console.log(roundedNumber); // Output: 4
 */
export function useRound(initialValue: number = 0): [number, RoundNumberFn] {
  const [result, setResult] = useState<number>(initialValue);

  const roundNumber: RoundNumberFn = useCallback((number: number) => {
    if (typeof number !== 'number') {
      console.error(
        "useRound: Input must be a number otherwise it'll return NaN"
      );
      return;
    }
    setResult(Math.round(number));
  }, []);

  return [result, roundNumber];
}
