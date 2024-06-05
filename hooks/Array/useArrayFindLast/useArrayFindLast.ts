import { useCallback, useMemo } from 'react';

/**
 * `Array.findLast`
 *
 * Provides a memoized version of the `Array.findLast` method.
 *
 * @param {T[]} list - The array to search.
 * @param {(element: T, index: number, array: T[]) => boolean} fn - A function to test each element in the array.
 * @returns {T | undefined} The last element in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
 *
 * @example
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const findLastUserByName = (user) => user.name.startsWith('B');
 * const lastUser = useArrayFindLast(users, findLastUserByName);
 * console.log(lastUser); // Output: { id: 2, name: 'Bob' }
 */
export function useArrayFindLast<T>(
  list: T[],
  fn: (element: T, index: number, array: T[]) => boolean
): T | undefined {
  const memoizedFn = useCallback(fn, [fn]);

  const findLast = useCallback(
    (array: T[]) => array.slice().reverse().find(memoizedFn),
    [memoizedFn]
  );

  return useMemo(() => findLast(list), [findLast, list]);
}
