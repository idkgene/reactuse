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
 * Sorts an array based on the provided comparison function and options.
 *
 * @param {T[]} source - The array to be sorted.
 * @param {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @param {UseSortedOptions<T>} [options] - Additional options for sorting.
 * @returns {T[]} A sorted array.
 * @template T
 */
function sortArray<T>(
  source: T[],
  compareFn?: UseSortedCompareFn<T>,
  options?: UseSortedOptions<T>
): T[] {
  const { sortFn = defaultSortFn, dirty = false } = options || {};

  if (dirty) {
    source.sort(compareFn);
    return source;
  }

  return sortFn([...source], compareFn);
}

/**
 * React hook that returns a sorted version of the provided array.
 *
 * @param {T[]} source - The array to be sorted.
 * @param {UseSortedCompareFn<T> | UseSortedOptions<T>} [compareFnOrOptions] - Comparison function or options object.
 * @param {Omit<UseSortedOptions<T>, 'compareFn'>} [options] - Additional options for sorting.
 * @returns {T[]} A sorted array.
 * @template T
 */
export function useSorted<T>(
  source: T[],
  compareFnOrOptions?: UseSortedCompareFn<T> | UseSortedOptions<T> | null,
  options?: Omit<UseSortedOptions<T>, 'compareFn'> | null
): T[] {
  const compareFn =
    typeof compareFnOrOptions === 'function'
      ? compareFnOrOptions
      : compareFnOrOptions?.compareFn;
  const mergedOptions: UseSortedOptions<T> | undefined =
    typeof compareFnOrOptions === 'object' && compareFnOrOptions !== null
      ? compareFnOrOptions
      : options ?? undefined;

  const sourceRef = React.useRef(source);

  if (sourceRef.current !== source) {
    sourceRef.current = source;
  }

  const sorted = React.useMemo(
    () => sortArray([...sourceRef.current], compareFn, mergedOptions),
    [compareFn, mergedOptions, source]
  );

  return sorted;
}
