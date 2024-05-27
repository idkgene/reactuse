import { useMemo } from 'react'

type UseArrayReducer<PV, CV, R> = (
  previousValue: PV,
  currentValue: CV,
  currentIndex: number
) => R

/**
 * @name useArrayReduce
 * @description `Array.reduce` hook for React.
 *
 * @param list - The array to reduce.
 * @param reducer - A "reducer" function.
 * @param initialValue - A value to be initialized the first time when the callback is called.
 *
 * @returns The value that results from running the "reducer" callback function to completion over the entire array.
 */
export function useArrayReduce<T, U>(
  list: T[],
  reducer: UseArrayReducer<U, T, U>,
  initialValue: U
): U {
  return useMemo(
    () => list.reduce(reducer, initialValue),
    [list, reducer, initialValue]
  )
}
