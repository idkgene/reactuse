import { useMemo } from 'react';

/**
 * Represents a predicate function used in the `useArrayFilter` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFilterPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

/**
 * `Array.filter` hook for React.
 *
 * Provides a memoized version of the `Array.filter` method that filters an array based on the specified predicate function.
 *
 * @param {T[]} list - The array to filter.
 * @param {UseArrayFilterPredicate<T>} predicate - A function that is called for every element of the given `list`, returning `true` for elements to include in the new array.
 * @returns {T[]} A shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const isEven = (number) => number % 2 === 0;
 * const evenNumbers = useArrayFilter(numbers, isEven);
 * console.log(evenNumbers); // Output: [2, 4]
 *
 * @example
 * const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
 * const adults = useArrayFilter(users, user => user.age >= 18);
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
