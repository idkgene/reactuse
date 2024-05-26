import { useMemo } from 'react'
import { UseArrayFindPredicate } from '../array'

/**
 * Reactive `Array.find` hook for React.
 *
 * @param list - The array to search.
 * @param predicate - A function to test each element.
 *
 * @returns The first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 */
export function useArrayFind<T>(
  list: T[],
  predicate: UseArrayFindPredicate<T>
): T | undefined {
  return useMemo(() => list.find(predicate), [list, predicate])
}
