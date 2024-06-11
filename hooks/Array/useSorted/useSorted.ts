import * as React from 'react';
import type { UseSortedOptions, UseSortedCompareFn } from '../array';

/**
 * Default sort function that creates a new sorted array using the provided comparison function.
 *
 * @param {T[]} arr - The array to be sorted.
 * @param {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @returns {T[]} A new sorted array.
 * @template T
 */
export function defaultSortFn<T>(
  arr: T[],
  compareFn?: UseSortedCompareFn<T>
): T[] {
  return [...arr].sort(compareFn);
}

/**
 * React hook that returns a sorted version of the provided array.
 *
 * @param {T[]} source - The array to be sorted.
 * @param {UseSortedCompareFn<T> | UseSortedOptions<T>} [compareFnOrOptions] - Comparison function or options object.
 * @param {Omit<UseSortedOptions<T>, 'compareFn'>} [options] - Additional options for sorting.
 */
export function useSorted<T>(
  source: T[],
  compareFnOrOptions?: UseSortedCompareFn<T> | UseSortedOptions<T>,
  options?: Omit<UseSortedOptions<T>, 'compareFn'>
): T[] {
  const {
    sortFn = defaultSortFn,
    compareFn,
    dirty = false,
  } = typeof compareFnOrOptions === 'function'
    ? { compareFn: compareFnOrOptions, ...options }
    : compareFnOrOptions || {};

  const sourceRef = React.useRef(source);

  if (sourceRef.current !== source) {
    sourceRef.current = source;
  }

  const sorted = React.useMemo(() => {
    if (dirty) {
      // If `dirty` is true, mutate the original array by sorting it in place.
      sourceRef.current.sort(compareFn);
      return sourceRef.current;
    }
    // If `dirty` is false, create a new sorted array using the sortFn`
    return sortFn([...sourceRef.current], compareFn);
  }, [sortFn, compareFn, dirty, source]);

  return sorted;
}
