import { useMemo } from 'react';

import type { UseArrayReduceCallback } from '../array';

/**
 * A React hook that provides a memoized implementation of the 
 * [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of the accumulated value.
 * @param {T[]} list - The array to reduce. If `list` is not an array, an error message is logged to the console and the hook returns the initial value.
 * @param {UseArrayReduceCallback<U, T, U>} reducer - A "reducer" function that accumulates the array elements.
 * @param {U} initialValue - A value to initialize the accumulator the first time the callback is called.
 * @returns {U} The value that results from running the "reducer" callback function to completion over the entire array.
 *
 * @example
 * // Summing up numbers in an array
 * import { useArrayReduce } from './useArrayReduce';
 *
 * const numbers = [1, 2, 3, 4];
 * const sum = useArrayReduce(numbers, (accumulator, number) => accumulator + number, 0);
 * console.log(sum); // Output: 10
 *
 * @example
 * // Reducing an array of objects to a single total count
 * const objects = [{ count: 1 }, { count: 2 }];
 * const totalCount = useArrayReduce(objects, (accumulator, obj) => accumulator + obj.count, 0);
 * console.log(totalCount); // Output: 3
 */
export function useArrayReduce<T, U>(
  list: T[],
  reducer: UseArrayReduceCallback<U, T, U>,
  initialValue: U
): U {
  return useMemo(() => {
    if (!Array.isArray(list)) {
      console.error(
        'Invalid list provided to useArrayReduce. Expected an array.'
      );
      return initialValue;
    }

    if (typeof reducer !== 'function') {
      console.error('Invalid reducer function provided to useArrayReduce.');
      return initialValue;
    }

    return list.reduce(reducer, initialValue);
  }, [list, reducer, initialValue]);
}
