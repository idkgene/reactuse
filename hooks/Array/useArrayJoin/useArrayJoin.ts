import { useMemo } from 'react'

/**
 * @name useArrayJoin
 * @description `Array.join` hook for React.
 *
 * @param list - The array to join.
 * @param separator - A string to separate each pair of adjacent elements of the array. If omitted, the array elements are separated with a comma (",").
 *
 * @returns A string with all array elements joined. If list.length is 0, an empty string is returned.
 */
function useArrayJoin<T>(list: T[], separator?: string): string {
  return useMemo(() => list.join(separator), [list, separator])
}

export default useArrayJoin
