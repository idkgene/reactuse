import { useMemo } from 'react'

/**
 * `Array.some` hook for React.
 *
 * Provides a memoized version of the `Array.some` method that tests whether at least one element in the array passes the provided predicate function.
 *
 * @param {T[]} list - The array to check.
 * @param {(element: T, index: number, array: T[]) => unknown} predicate - A function to test each element in the array.
 * @returns {boolean} `true` if the `predicate` function returns a truthy value for any element in the array, otherwise `false`.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const hasEvenNumber = useArraySome(numbers, (number) => number % 2 === 0);
 * console.log(hasEvenNumber); // Output: true
 *
 * @example
 * const users = [{ isAdmin: false }, { isAdmin: true }];
 * const hasAdmin = useArraySome(users, (user) => user.isAdmin);
 * console.log(hasAdmin); // Output: true
 */
export function useArraySome<T>(
  list: T[],
  predicate: (element: T, index: number, array: T[]) => unknown
): boolean {
  return useMemo(() => list.some(predicate), [list, predicate]);
}
