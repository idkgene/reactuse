import * as React from 'react'

/**
 * Represents a predicate function used in the `useArrayFindLast` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFindLastPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

/**
 * `Array.findLast` hook for React.
 *
 * Provides a memoized version of the `Array.findLast` method.
 *
 * @param {T[]} list - The array to search.
 * @param {UseArrayFindLastPredicate<T>} predicate - A function to test each element in the array.
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
  predicate: UseArrayFindLastPredicate<T>
): T | undefined {
  const memoizedPredicate = React.useCallback(predicate, [predicate]);

  return React.useMemo(() => {
    if (typeof memoizedPredicate !== 'function') {
      console.error('Invalid predicate function provided to useArrayFindLast.');
      return undefined;
    }

    if (Array.isArray(list) && list.length === 0) {
      return undefined;
    }

    for (let i = list.length - 1; i >= 0; i--) {
      if (memoizedPredicate(list[i], i, list)) {
        return list[i];
      }
    }

    return undefined;
  }, [list, memoizedPredicate]);
}
