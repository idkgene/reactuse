import { useMemo } from 'react'

/**
 * Reactive `Array.map` hook for React.
 *
 * @param list - The array to map over.
 * @param callback - A function that is called for every element of the given `list`. Each time `callback` executes, the returned value is added to the new array.
 *
 * @returns A new array with each element being the result of the callback function.
 */
export function useArrayMap<T, U = T>(
  list: T[],
  callback: (element: T, index: number, array: T[]) => U
): U[] {
  return useMemo(() => list.map(callback), [list, callback])
}
