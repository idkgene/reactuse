import { useMemo, useRef } from 'react'

type SortCompareFn<T> = (a: T, b: T) => number

interface UseSortedOptions<T> {
  /**
   * sort algorithm
   */
  sortFn?: (arr: T[], compareFn: SortCompareFn<T>) => T[]
  /**
   * compare function
   */
  compareFn?: SortCompareFn<T>
  /**
   * change the value of the source array
   * @default false
   */
  dirty?: boolean
}

/**
 * Reactive sort array
 *
 * @param source - The array to be sorted
 * @param compareFnOrOptions - The compare function or options for sorting
 * @returns The sorted array
 */
function useSorted<T>(
  source: T[],
  compareFnOrOptions?: SortCompareFn<T> | UseSortedOptions<T>
): T[] {
  const sourceRef = useRef<T[]>(source)
  const compareFn = useMemo<SortCompareFn<T>>(() => {
    if (typeof compareFnOrOptions === 'function') {
      return compareFnOrOptions
    } else if (compareFnOrOptions?.compareFn) {
      return compareFnOrOptions.compareFn
    } else {
      return (a, b) => (a > b ? 1 : a < b ? -1 : 0)
    }
  }, [compareFnOrOptions])

  const sortFn = useMemo<(arr: T[], compareFn: SortCompareFn<T>) => T[]>(() => {
    if (compareFnOrOptions && 'sortFn' in compareFnOrOptions) {
      return compareFnOrOptions.sortFn! // Add non-null assertion operator
    } else {
      return (arr, compareFn) => arr.slice().sort(compareFn)
    }
  }, [compareFnOrOptions])

  const dirty = useMemo<boolean>(() => {
    return compareFnOrOptions && 'dirty' in compareFnOrOptions
      ? compareFnOrOptions.dirty ?? false
      : false
  }, [compareFnOrOptions])

  const sorted = useMemo<T[]>(() => {
    if (dirty) {
      sourceRef.current.sort(compareFn)
      return sourceRef.current
    } else {
      return sortFn(sourceRef.current, compareFn)
    }
  }, [dirty, compareFn, sortFn])

  return sorted
}

export default useSorted
