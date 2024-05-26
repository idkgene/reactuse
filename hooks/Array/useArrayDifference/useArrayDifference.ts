import { useMemo } from 'react'
import { UseArrayDifferenceKey } from '../array'

/**
 * @name useArrayDifference
 * @description Returns a new array containing elements from `list` that are not present in `values`.
 * If `keyOrCompareFn` is a function, it is used to determine if an element is present in `values`.
 * If `keyOrCompareFn` is a string, it is used as a key to compare elements in `list` and `values`.
 * If `keyOrCompareFn` is not provided, `values.includes(item)` is used to determine if an element is present in `values`.
 *
 * @returns {T[]} - A new array containing elements from `list` that are not present in `values`.
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
