import * as React from 'react';
import { UseArrayEveryPredicate } from '../array';

/**
 * `A React hook that provides a memoized implementation of the `Array.every()` method.
 *
 * @param {T[]} list - The array to check.
 * @param {UseArrayEveryPredicate<T>} predicate - A function to test each element.
 * @returns {boolean} `true` if the `predicate` function returns a truthy value for every element from the array. Otherwise, `false`.
 *
 * @example
 * const numbers = [2, 4, 6, 8];
 *
 * const areAllEven = useArrayEvery(numbers, (number) => number % 2 === 0);
 *
 */
export function useArrayEvery<T>(
  list: T[],
  predicate: UseArrayEveryPredicate<T>
): boolean {
  return React.useMemo(() => {
    if (typeof predicate !== 'function') {
      console.error('Invalid predicate function provided to useArrayEvery.');
      return false;
    }

    if (!Array.isArray(list)) {
      console.error('Invalid array provided to useArrayEvery.');
      return false;
    }

    if (list.length === 0) {
      return true;
    }

    return list.every(predicate);
  }, [list, predicate]);
}
