import { useMemo } from 'react';

import type { UseArrayFindIndexPredicate } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.findIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to search. If `list` is not an array, an error message is logged to the console and the hook returns `-1`.
 * @param {UseArrayFindIndexPredicate<T>} predicate - A function to test each element in the array.
 * @returns {number} The index of the first element in the array that passes the test. Otherwise, `-1`.
 *
 * @example
 * // Finding the index of a user by ID
 * import { useArrayFindIndex } from './useArrayFindIndex';
 *
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' }
 * ];
 * const findUserIndexById = (user: { id: number; name: string }) => user.id === 2;
 * const userIndex = useArrayFindIndex(users, findUserIndexById);
 * console.log(userIndex); // Output: 1
 */
export function useArrayFindIndex<T>(
  list: T[],
  predicate: UseArrayFindIndexPredicate<T>
): number {
  return useMemo(() => {
    if (typeof predicate !== 'function') {
      console.error(
        'Invalid predicate function provided to useArrayFindIndex.'
      );
      return -1;
    }

    if (Array.isArray(list) && list.length === 0) {
      return -1;
    }

    return list.findIndex(predicate);
  }, [list, predicate]);
}
