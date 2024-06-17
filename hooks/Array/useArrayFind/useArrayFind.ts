import { useMemo } from 'react';

import { UseArrayFindPredicate } from '../array';

/**
 * `Array.find` hook for React.
 *
 * Provides a memoized version of the `Array.find` method that searches for the first element in the array that satisfies the provided predicate function.
 *
 * @param {T[]} list - The array to search.
 * @param {UseArrayFindPredicate<T>} predicate - A function to test each element in the array.
 *
 * @returns {T | undefined} The first element in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
 *
 * @example
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' }
 * ];
 * const findUserById = (user) => user.id === 2;
 * const user = useArrayFind(users, findUserById);
 * console.log(user); // Output: { id: 2, name: 'Bob' }
 */
export function useArrayFind<T>(
  list: T[],
  predicate: UseArrayFindPredicate<T>
): T | undefined {
  return useMemo(() => {
    if (typeof predicate !== 'function') {
      console.error('Invalid predicate function provided to useArrayFind.');
      return undefined;
    }

    if (Array.isArray(list) && list.length === 0) {
      return undefined;
    }

    return list.find(predicate);
  }, [list, predicate]);
}
