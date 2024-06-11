import * as React from 'react';
import type { UseArrayFindIndexPredicate } from '../array';

/**
 * `Array.findIndex` hook for React.
 *
 * Provides a memoized version of the `Array.findIndex` method.
 *
 * @param {T[]} list - The array to search.
 * @param {UseArrayFindIndexPredicate<T>} predicate - A function to test each element in the array.
 *
 * @returns {number} The index of the first element in the array that passes the test. Otherwise, `-1`.
 *
 * @example
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' }
 * ];
 * const findUserIndexById = (user) => user.id === 2;
 * const userIndex = useArrayFindIndex(users, findUserIndexById);
 * console.log(userIndex); // Output: 1
 */
export function useArrayFindIndex<T>(
  list: T[],
  predicate: UseArrayFindIndexPredicate<T>
): number {
  return React.useMemo(() => {
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
