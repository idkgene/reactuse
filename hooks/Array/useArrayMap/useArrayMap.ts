import { useMemo } from 'react';

/**
 * A React hook that provides a memoized implementation of the 
 * [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of elements in the output array.
 * @param {T[]} list - The array to map over. If `list` is not an array, an error message is logged to the console and the hook returns an empty array.
 * @param {(element: T, index: number, array: T[]) => U} callback - A function that is called for every element of the given `list`. Each time `callback` executes, the returned value is added to the new array.
 * @returns {U[]} A new array with each element being the result of the callback function.
 *
 * @example
 * // Mapping numbers to their squares
 * import { useArrayMap } from './useArrayMap';
 *
 * const numbers = [1, 2, 3, 4];
 * const squaredNumbers = useArrayMap(numbers, (number) => number * number);
 * console.log(squaredNumbers); // Output: [1, 4, 9, 16]
 *
 * @example
 * // Extracting user names from an array of user objects
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
