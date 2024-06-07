/**
 * Represents a key or a comparison function used in the `useArrayDifference` function.
 *
 * @template T - The type of elements in the array.
 * @typeparam {keyof T | ((value: T, othVal: T) => boolean)} - The key or comparison function.
 * @description
 * If a key is provided, it is used to compare elements in the `list` and `values` arrays.
 * If a comparison function is provided, it is used to determine if an element is present in the `values` array.
 */
export type UseArrayDifferenceKey<T> =
  | keyof T
  | ((value: T, othVal: T) => boolean);

/**
 * Represents a predicate function used in the `useArrayEvery` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {unknown} - The result of the predicate function.
 */
export type UseArrayEveryPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => unknown;

/**
 * Represents a predicate function used in the `useArrayFind` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFindPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

/**
 * Represents a comparator function used in the `useArrayIncludes` function.
 *
 * @template T - The type of elements in the array.
 * @template V - The type of the value being searched for.
 * @param {T} element - The current element being processed.
 * @param {V} value - The value being searched for.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the comparator function.
 */
export type UseArrayIncludesComparatorFn<T extends object, V> = (
  element: T,
  value: V,
  index: number,
  array: T[]
) => boolean;

/**
 * Represents the options for the `useArrayIncludes` function.
 *
 * @template T - The type of elements in the array.
 * @template V - The type of the value being searched for.
 */
export interface UseArrayIncludesOptions<T, V> {
  /**
   * The index to start searching from.
   */
  fromIndex?: number;

  /**
   * The comparator function or key to compare elements.
   */
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T;
}
