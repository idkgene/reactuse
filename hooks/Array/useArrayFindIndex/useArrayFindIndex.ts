import { useMemo } from 'react';

/**
 * Represents a predicate function used in the `useArrayFindIndex` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFindIndexPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

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
