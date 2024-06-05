import { useMemo } from 'react'
import { UseArrayDifferenceKey } from '../array'

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
  return useMemo(() => {
    if (typeof keyOrCompareFn === 'function') {
      return list.filter(
        (item) => !values.some((othItem) => keyOrCompareFn(item, othItem))
      )
    } else if (typeof keyOrCompareFn === 'string') {
      const key = keyOrCompareFn
      return list.filter(
        (item) => !values.some((othItem) => item[key] === othItem[key])
      )
    } else {
      return list.filter((item) => !values.includes(item))
    }
  }, [list, values, keyOrCompareFn])
}
