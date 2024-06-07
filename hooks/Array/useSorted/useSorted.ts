import * as React from 'react';

/**
 * Function used for comparing two elements during sorting.
 *
 * @template T - The type of elements being compared.
 * @typedef {Function} SortCompareFn
 * @param {T} a - The first element to compare.
 * @param {T} b - The second element to compare.
 * @returns {number} Returns a negative value if `a` should come before `b`,
 * a positive value if `a` should come after `b`, or `0` if they are equivalent.
 */
type SortCompareFn<T> = (a: T, b: T) => number;

interface UseSortedOptions<T> {
  /**
   * Sort algorithm for custom sorting.
   *
   * @param {T[]} arr - The array to be sorted.
   * @param {SortCompareFn<T>} compareFn - Comparison function for sorting.
   * @returns {T[]} Sorted array.
   */
  sortFn?: (arr: T[], compareFn: SortCompareFn<T>) => T[];

  /**
   * Comparison function for sorting elements.
   *
   * @type {SortCompareFn<T>}
   */
  compareFn?: SortCompareFn<T>;

  /**
   * Indicates whether to modify the source array directly.
   *
   * @default false
   * @type {boolean}
   */
  dirty?: boolean;
}

/**
 * A hook that returns a sorted version of the provided array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} source - The array to be sorted.
 * @param {SortCompareFn<T> | UseSortedOptions<T>} [compareFnOrOptions] - A comparison function or an options object.
 *
 * @returns {T[]} The sorted array.
 *
 * @example
 * const sortedNumbers = useSorted([3, 1, 4, 1, 5, 9], (a, b) => a - b);
 * console.log(sortedNumbers); // Output: [1, 1, 3, 4, 5, 9]
 *
 * @example
 * const options = {
 *   compareFn: (a, b) => a - b,
 *   dirty: true
 * };
 * const sortedNumbers = useSorted([3, 1, 4, 1, 5, 9], options);
 * console.log(sortedNumbers); // Output: [1, 1, 3, 4, 5, 9]
 */
export function useSorted<T>(
  source: T[],
  compareFnOrOptions?: SortCompareFn<T> | UseSortedOptions<T>
): T[] {
  const sourceRef = React.useRef<T[]>(source);
  const compareFn = React.useMemo<SortCompareFn<T>>(() => {
    if (typeof compareFnOrOptions === 'function') {
      return compareFnOrOptions;
    } else if (compareFnOrOptions?.compareFn) {
      return compareFnOrOptions.compareFn;
    } else {
      return (a, b) => (a > b ? 1 : a < b ? -1 : 0);
    }
  }, [compareFnOrOptions]);

  const sortFn = React.useMemo<
    (arr: T[], compareFn: SortCompareFn<T>) => T[]
  >(() => {
    if (compareFnOrOptions && 'sortFn' in compareFnOrOptions) {
      return compareFnOrOptions.sortFn!;
    } else {
      return (arr, compareFn) => arr.slice().sort(compareFn);
    }
  }, [compareFnOrOptions]);

  const dirty = React.useMemo<boolean>(() => {
    return compareFnOrOptions && 'dirty' in compareFnOrOptions
      ? compareFnOrOptions.dirty ?? false
      : false;
  }, [compareFnOrOptions]);

  const sorted = React.useMemo<T[]>(() => {
    if (dirty) {
      sourceRef.current = [...sourceRef.current].sort(compareFn);
      return sourceRef.current;
    } else {
      const copiedSource = sourceRef.current.slice();
      return sortFn(copiedSource, compareFn);
    }
  }, [dirty, compareFn, sortFn]);

  return sorted;
}
