import { useMemo } from 'react'
import { UseArrayEveryPredicate } from '../array'

/**
 * `Array.findIndex` hook for React.
 *
 * Provides a memoized version of the `Array.findIndex` method.
 *
 * @param {T[]} list - The array to search.
 * @param {UseArrayEveryPredicate<T>} predicate - A function to test each element in the array.
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
  predicate: UseArrayEveryPredicate<T>
): number {
  return useMemo(() => list.findIndex(predicate), [list, predicate])
}
