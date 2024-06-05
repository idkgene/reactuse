import { useMemo } from 'react';

/**
 * `Array.filter` hook for React.
 *
 * Provides a memoized version of the `Array.filter` method that filters an array based on the specified predicate function.
 *
 * @param {T[]} list - The array to filter.
 * @param {(element: T, index: number, array: T[]) => boolean} predicate - A function that is called for every element of the given `list`, returning `true` for elements to include in the new array.
 * @returns {T[]} A shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const isEven = (number) => number % 2 === 0;
 * const evenNumbers = useArrayFilter(numbers, isEven);
 * console.log(evenNumbers); // Output: [2, 4]
 */
export function useArrayFilter<T>(
  list: T[],
  predicate: (element: T, index: number, array: T[]) => boolean
): T[] {
  return useMemo(() => list.filter(predicate), [list, predicate]);
}
