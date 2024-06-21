import { useMemo } from 'react';

import { UseArrayEveryPredicate } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to check.
 * @param {UseArrayEveryPredicate<T>} predicate - A function to test each element.
 * @returns {boolean} `true` if the `predicate` function returns a truthy value for every element from the array. Otherwise, `false`.
 *
 * @example
 * import { useArrayEvery } from './useArrayEvery';
 *
 * const numbers = [2, 4, 6, 8];
 *
 * const areAllEven = useArrayEvery(numbers, (number) => number % 2 === 0);
 * // areAllEven will be `true`
 */
export function useArrayEvery<T>(
  list: T[],
  predicate: UseArrayEveryPredicate<T>
): boolean {
  return useMemo(() => {
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
