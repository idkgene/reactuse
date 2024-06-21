import * as React from 'react';

import { UseCounterOptions, UseCounterResult } from '../utilities';

/**
 * Provides a counter with increment, decrement, and reset functions, with optional min and max constraints.
 *
 * @param {number} [initialValue=0] - The initial value of the counter.
 * @param {UseCounterOptions} [options] - Options to define minimum and maximum values.
 * @param {number} [options.min] - The minimum value the counter can have.
 * @param {number} [options.max] - The maximum value the counter can have.
 * @returns {UseCounterResult} An object containing the current count and counter manipulation functions.
 *
 * @example
 * Basic counter with increment and decrement
 * const { count, inc, dec, reset } = useCounter(0);
 * inc(); // count is now 1
 * dec(); // count is now 0
 * reset(); // count is reset to 0
 */
export function useCounter(
  initialValue: number = 0,
  options?: UseCounterOptions
): UseCounterResult {
  const { min, max } = options || {};

  const [count, setCount] = React.useState(initialValue);

  const inc = React.useCallback(
    (delta: number = 1) => {
      setCount(prev => {
        const newValue = prev + delta;
        return max !== undefined ? Math.min(newValue, max) : newValue;
      });
    },
    [max]
  );

  const dec = React.useCallback(
    (delta: number = 1) => {
      setCount(prev => {
        const newValue = prev - delta;
        return min !== undefined ? Math.max(newValue, min) : newValue;
      });
    },
    [min]
  );

  const get = React.useCallback(() => count, [count]);

  const set = React.useCallback(
    (value: number) => {
      setCount(() => {
        if (min !== undefined && value < min) return min;
        if (max !== undefined && value > max) return max;
        return value;
      });
    },
    [min, max]
  );

  const reset = React.useCallback(
    (value: number = initialValue) => {
      setCount(() => {
        if (min !== undefined && value < min) return min;
        if (max !== undefined && value > max) return max;
        return value;
      });
    },
    [initialValue, min, max]
  );

  return { count, inc, dec, get, set, reset };
}
