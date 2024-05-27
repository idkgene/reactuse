import { useMemo } from 'react'
import { UseArrayIncludesOptions, UseArrayIncludesComparatorFn } from '../array'

/**
 * @name useArrayIncludes
 * @description `Array.includes` hook for React.
 *
 * @param list - The array to search.
 * @param value - The value to search for.
 * @param options - Additional options for the search.
 *
 * @returns `true` if the `value` is found in the array. Otherwise, `false`.
 */
export function useArrayIncludes<T, V = any>(
  list: T[],
  value: V,
  options?: UseArrayIncludesOptions<T, V>
): boolean {
  const { fromIndex, comparator } = options || {}

  return useMemo(() => {
    if (typeof comparator === 'function') {
      return list.some((element, index, array) =>
        (comparator as UseArrayIncludesComparatorFn<T, V>)(
          element,
          value,
          index,
          array
        )
      )
    } else if (typeof comparator === 'string') {
      return list.some((element) => element[comparator as keyof T] === value)
    } else {
      return list.includes(value as unknown as T, fromIndex)
    }
  }, [list, value, fromIndex, comparator])
}
