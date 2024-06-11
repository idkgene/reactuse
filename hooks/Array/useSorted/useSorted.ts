import { useMemo, useRef } from 'react';

/**
 * Comparison function type for sorting elements in an array.
 *
 * @typedef {Function} UseSortedCompareFn
 * @param {T} a - The first element to compare.
 * @param {T} b - The second element to compare.
 * @returns {number} A negative value if `a` should be sorted before `b`,
 * a positive value if `b` should be sorted before `a`, or zero if they're equal.
 * @template T
 */
type UseSortedCompareFn<T> = (a: T, b: T) => number;

/**
 * Options for the `useSorted` hook.
 *
 * @interface UseSortedOptions
 * @template TestComponent
 * @property {Function} [sortFn] - Custom sort function to use instead of the default.
 * @property {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @property {boolean} [dirty] - Flag indicating whether to mutate the original array.
 */
interface UseSortedOptions<T> {
  sortFn?: (arr: T[], compareFn?: UseSortedCompareFn<T>) => T[];
  compareFn?: UseSortedCompareFn<T>;
  dirty?: boolean;
}

/**
 * Default sort function that creates a new sorted array using the provided comparison function.
 *
 * @param {T[]} arr - The array to be sorted.
 * @param {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @returns {T[]} A new sorted array.
 * @template T
 */
function defaultSortFn<T>(arr: T[], compareFn?: UseSortedCompareFn<T>): T[] {
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

  const sourceRef = useRef(source);

  if (sourceRef.current !== source) {
    sourceRef.current = source;
  }

  const sorted = useMemo(() => {
    if (dirty) {
      // If `dirty` is true, mutate the original array by sorting it in place.
      sourceRef.current.sort(compareFn);
      return sourceRef.current;
    }
    // If `dirty` is false, create a new sorted array using the `sortFn`
    return sortFn([...sourceRef.current], compareFn);
  }, [sortFn, compareFn, dirty, source]);

  return sorted;
}
