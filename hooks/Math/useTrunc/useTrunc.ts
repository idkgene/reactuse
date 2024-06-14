import * as React from 'react';

import type { TruncateNumberFn } from '../math';

/**
 * Truncates a number by removing its fractional part
 *
 * @param {number} initialValue - The initial value of the truncated number. Defaults to 0.
 * @returns {[number, TruncateNumberFn]} An array containing the current truncated number and a function to update it.
 *
 * @example
 * const [truncatedNumber, truncateNumber] = useTrunc();
 * console.log(truncatedNumber); // Output: 0
 * truncatedNumber(3.14);
 * console.log(truncatedNumber); // Output: 3
 */
export function useTrunc(initialValue: number = 0): [number, TruncateNumberFn] {
  const [result, setResult] = React.useState(initialValue);
  const truncateNumber: TruncateNumberFn = React.useCallback(
    (number: number) => {
      if (typeof number !== 'number') {
        console.error(
          "useTrunc: Input must be a number otherwise it'll return NaN"
        );
        return;
      }
      setResult(Math.trunc(number));
    },
    []
  );

  return [result, truncateNumber];
}
