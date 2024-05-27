import { useCallback, useMemo } from 'react'

/**
 * @name useArrayUnique
 * @description Custom hook to get a unique array of items.
 *
 * @returns A unique array of items.
 */
export function useArrayUnique<T>(
  items: T[],
  compareFn?: (a: T, b: T, array: T[]) => boolean
): T[] {
  const compareItems = useCallback(
    (a: T, b: T, array: T[]) => {
      if (compareFn) {
        return compareFn(a, b, array)
      }
      return JSON.stringify(a) === JSON.stringify(b)
    },
    [compareFn]
  )

  return useMemo(() => {
    const uniqueItems: T[] = []
    items.forEach((item) => {
      if (
        !uniqueItems.some((uniqueItem) => compareItems(item, uniqueItem, items))
      ) {
        uniqueItems.push(item)
      }
    })
    return uniqueItems
  }, [items, compareItems])
}
