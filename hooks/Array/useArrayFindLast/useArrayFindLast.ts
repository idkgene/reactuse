import { useCallback, useMemo } from 'react'

/**
 * @name useArrayFindLast
 * @description `Array.findLast`
 *
 * @param list - the array to search.
 * @param fn - a function to test each element.
 *
 * @returns the last element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 */
export function useArrayFindLast<T>(
  list: T[],
  fn: (element: T, index: number, array: T[]) => boolean
): T | undefined {
  const memoizedFn = useCallback(fn, [fn])

  const findLast = useCallback(
    (array: T[]) => array.slice().reverse().find(memoizedFn),
    [memoizedFn]
  )

  return useMemo(() => findLast(list), [findLast, list])
}
