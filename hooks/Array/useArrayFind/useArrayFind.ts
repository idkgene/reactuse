import { useMemo } from 'react';

import { UseArrayFindPredicate } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method.
 * 
 * @template T - The type of elements in the array
 * @param {T[]} list - The array to search.
 * @param {UseArrayFindPredicate<T>} predicate - A function to test each element in the array.
 *
 * @returns {T | undefined} - The first element in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
 *
 * @example
 * // Finding a user by ID
 * import { useArrayFind } from './useArrayFind';
 *
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' }
 * ];
 * const findUserById = (user: { id: number; name: string }) => user.id === 2;
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
