import { useMemo } from 'react'

/**
 * Reactive `Array.some` hook for React.
 *
 * @param list - The array to check.
 * @param predicate - A function to test each element.
 *
 * @returns `true` if the `predicate` function returns a truthy value for any element from the array. Otherwise, `false`.
 */
export function useArraySome<T>(
  list: T[],
  predicate: (element: T, index: number, array: T[]) => unknown
): boolean {
  return useMemo(() => list.some(predicate), [list, predicate])
}
