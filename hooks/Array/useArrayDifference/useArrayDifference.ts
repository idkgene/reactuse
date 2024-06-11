import * as React from 'react';
import type { UseArrayDifferenceKey } from '../array';

/**
 * A React hook that returns the difference between two arrays.
 *
 * @param {T[]} list - The first array.
 * @param {T[]} values - The second array.
 * @param {UseArrayDifferenceKey<T>} keyOrCompareFn - Optional. A key of an object or a custom comparator function.
 * @returns {T[]} The difference between the two arrays.
 *
 * @example
 * const difference = useArrayDifference(list1, list2);
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
