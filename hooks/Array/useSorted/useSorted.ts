import { useMemo } from 'react';

import type { UseSortedOptions, UseSortedCompareFn } from '../array';

/**
 * Default sort function that creates a new sorted array using the provided comparison function.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to be sorted.
 * @param {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @returns {T[]} A new sorted array.
 *
 * @example
 * // Using defaultSortFn directly with a custom comparison function
 * import { defaultSortFn } from './useSorted';
 *
 * const numbers = [3, 1, 4, 1, 5, 9];
 * const sortedNumbers = defaultSortFn(numbers, (a, b) => a - b);
 * console.log(sortedNumbers); // Output: [1, 1, 3, 4, 5, 9]
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
 * @template T - The type of elements in the array.
 * @param {T[]} source - The array to be sorted.
 * @param {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @param {UseSortedOptions<T>} [options] - Additional options for sorting.
 * @returns {T[]} A sorted array.
 *
 * @example
 * // Sorting with custom comparison function and options
 * import { sortArray } from './useSorted';
 *
 * const items = [{ id: 3 }, { id: 1 }, { id: 2 }];
 * const sortedItems = sortArray(items, (a, b) => a.id - b.id, { dirty: false });
 * console.log(sortedItems); // Output: [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
export function sortArray<T>(
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
 * @template T - The type of elements in the array.
 * @param {T[]} source - The array to be sorted.
 * @param {UseSortedCompareFn<T> | UseSortedOptions<T>} [compareFnOrOptions] - Comparison function or options object.
 * @param {Omit<UseSortedOptions<T>, 'compareFn'>} [options] - Additional options for sorting.
 * @returns {T[]} A sorted array.
 *
 * @example
 * // Using the hook with a comparison function
 * import { useSorted } from './useSorted';
 *
 * const numbers = [3, 1, 4, 1, 5, 9];
 * const sortedNumbers = useSorted(numbers, (a, b) => a - b);
 * console.log(sortedNumbers); // Output: [1, 1, 3, 4, 5, 9]
 *
 * @example
 * // Using the hook with options for a custom sort function
 * const items = [{ name: 'Alice' }, { name: 'Bob' }];
 * const sortedItems = useSorted(items, {
 *   compareFn: (a, b) => a.name.localeCompare(b.name),
 *   sortFn: (arr, compareFn) => [...arr].sort(compareFn),
 *   dirty: false
 * });
 * console.log(sortedItems); // Output: [{ name: 'Alice' }, { name: 'Bob' }]
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

  const sorted = useMemo(
    () => sortArray(source, compareFn, mergedOptions),
    [source, compareFn, mergedOptions]
  );

  return sorted;
}
