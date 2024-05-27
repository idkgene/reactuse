import { useMemo } from 'react'
import { UseArrayEveryPredicate } from '../array'

/**
 * @name useArrayFindIndex
 * @description `Array.findIndex` hook for React.
 *
 * @param list - The array to search.
 * @param predicate - A function to test each element.
 *
 * @returns The index of the first element in the array that passes the test. Otherwise, "-1".
 */
export function useArrayFindIndex<T>(
  list: T[],
  predicate: UseArrayEveryPredicate<T>
): number {
  return useMemo(() => list.findIndex(predicate), [list, predicate])
}
