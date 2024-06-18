import { useCallback, useMemo } from 'react';

import type { UseArrayFindLastPredicate } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.findLast`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to search. If `list` is not an array, an error message is logged to the console and the hook returns `undefined`.
 * @param {UseArrayFindLastPredicate<T>} predicate - A function to test each element in the array.
 * @returns {T | undefined} The last element in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
 *
 * @example
 * // Finding the last user whose name starts with "B"
 * import { useArrayFindLast } from './useArrayFindLast';
 *
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const findLastUserByName = (user: { id: number; name: string }) => user.name.startsWith('B');
 * const lastUser = useArrayFindLast(users, findLastUserByName);
 * console.log(lastUser); // Output: { id: 2, name: 'Bob' }
 */
export function useArrayFindLast<T>(
  list: T[],
  predicate: UseArrayFindLastPredicate<T>
): T | undefined {
  const memoizedPredicate = useCallback(predicate, [predicate]);

  return useMemo(() => {
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
