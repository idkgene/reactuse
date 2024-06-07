import * as React from 'react';

export type UseArrayDifferenceComparatorFn<T> = (
  element: T,
  value: T
) => boolean;

export type UseArrayDifferenceKey<T> =
  | keyof T
  | UseArrayDifferenceComparatorFn<T>;

/**
 * Calculates the difference between two arrays.
 *
 * @param {T[]} list - The original array.
 * @param {T[]} values - The array to compare against.
 * @param {UseArrayDifferenceKey<T>} [keyOrCompareFn] - The key to use for comparison.
 *
 * @returns {T[]} - A new array containing elements from `list` that are not present in `values`.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const values = [3, 4];
 * const difference = useArrayDifference(numbers, values);
 * console.log(difference); // Output: [1, 2, 5]
 */
export function useArrayDifference<T>(
  list: T[],
  values: T[],
  keyOrCompareFn?: UseArrayDifferenceKey<T>
): T[] {
  return React.useMemo(() => {
    if (list.length === 0) {
      return [];
    }

    if (values.length === 0) {
      return [...list];
    }

    if (typeof keyOrCompareFn === 'function') {
      return list.filter(
        item => !values.some(othItem => keyOrCompareFn(item, othItem))
      );
    } else if (typeof keyOrCompareFn === 'string') {
      const key = keyOrCompareFn;
      const valuesSet = new Set(values.map(item => item[key]));
      return list.filter(item => !valuesSet.has(item[key]));
    } else {
      const valuesSet = new Set(values);
      return list.filter(item => !valuesSet.has(item));
    }
  }, [list, values, keyOrCompareFn]);
}
