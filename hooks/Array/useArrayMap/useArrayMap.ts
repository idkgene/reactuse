import { useMemo } from 'react';

/**
 * `Array.map` hook for React.
 *
 * Provides a memoized version of the `Array.map` method that creates a new array populated with the results of calling a provided function on every element in the given array.
 *
 * @param {T[]} list - The array to map over.
 * @param {(element: T, index: number, array: T[]) => U} callback - A function that is called for every element of the given `list`. Each time `callback` executes, the returned value is added to the new array.
 * @returns {U[]} A new array with each element being the result of the callback function.
 *
 * @example
 * const numbers = [1, 2, 3, 4];
 * const squaredNumbers = useArrayMap(numbers, (number) => number * number);
 * console.log(squaredNumbers); // Output: [1, 4, 9, 16]
 *
 * @example
 * const users = [{ name: 'Alice' }, { name: 'Bob' }];
 * const userNames = useArrayMap(users, (user) => user.name);
 * console.log(userNames); // Output: ['Alice', 'Bob']
 */
export function useArrayMap<T, U = T>(
  list: T[],
  callback: (element: T, index: number, array: T[]) => U
): U[] {
  return useMemo(() => list.map(callback), [list, callback]);
}
