import { useMemo } from 'react'

/**
 * @name useArrayFilter
 * @description `Array.filter` hook for React.
 *
 * @param list - The array to filter.
 * @param predicate - A function that is called for every element of the given `list`. Each time `predicate` executes, the returned value is added to the new array.
 *
 * @returns A shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 */
export function useArrayFilter<T>(
  list: T[],
  predicate: (element: T, index: number, array: T[]) => boolean
): T[] {
  return useMemo(() => list.filter(predicate), [list, predicate])
}
