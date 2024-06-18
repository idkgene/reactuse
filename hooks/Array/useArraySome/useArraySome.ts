import { useMemo } from 'react';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to check. If `list` is not an array, an error message is logged to the console and the hook returns `false`.
 * @param {(element: T, index: number, array: T[]) => unknown} predicate - A function to test each element in the array.
 * @returns {boolean} `true` if the `predicate` function returns a truthy value for any element in the array, otherwise `false`.
 *
 * @example
 * // Checking if there is any even number in an array
 * import { useArraySome } from './useArraySome';
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const hasEvenNumber = useArraySome(numbers, (number) => number % 2 === 0);
 * console.log(hasEvenNumber); // Output: true
 *
 * @example
 * // Checking if there is any admin user in an array of users
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
