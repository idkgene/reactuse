import { useMemo } from 'react';

import type { UseArrayFilterPredicate } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to filter. If `list` is not an array, an error message is logged to the console and the hook returns an empty array.
 * @param {UseArrayFilterPredicate<T>} predicate - A function that is called for every element of the given `list`, returning `true` for elements to include in the new array.
 * @returns {T[]} A shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 *
 * @example
 * // Basic example filtering even numbers
 * import { useArrayFilter } from './useArrayFilter';
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const isEven = (number: number) => number % 2 === 0;
 * const evenNumbers = useArrayFilter(numbers, isEven);
 * console.log(evenNumbers); // Output: [2, 4]
 *
 * @example
 * // Filtering objects by a specific property
 * const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
 * const adults = useArrayFilter(users, (user) => user.age >= 18);
 * console.log(adults); // Output: [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 */
export function useArrayFilter<T>(
  list: T[],
  predicate: UseArrayFilterPredicate<T>
): T[] {
  return useMemo(() => {
    if (typeof predicate !== 'function') {
      console.error('Invalid predicate function provided to useArrayFilter.');
      return [];
    }

    if (Array.isArray(list) && list.length === 0) {
      return [];
    }

    return list.filter(predicate);
  }, [list, predicate]);
}
