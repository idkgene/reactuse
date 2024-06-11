/**
 * A function that compares two elements for equality.
 *
 * @param element - The first element to compare.
 * @param value - The second element to compare.
 * @returns {boolean} `true` if the elements are equal, `false` otherwise.
 */
export type UseArrayDifferenceComparatorFn<T> = (
  element: T,
  value: T
) => boolean;

/**
 * A key of an object or a custom comparator function used to determine the uniqueness of elements in array.
 */
export type UseArrayDifferenceKey<T> =
  | keyof T
  | UseArrayDifferenceComparatorFn<T>;

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
 * Represents a predicate function used in the `useArrayFilter` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFilterPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

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
 * Represents a predicate function used in the `useArrayFindIndex` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFindIndexPredicate<T> = (
  element: T,
  index: number,
  array: T[]
) => boolean;

/**
 * Represents a predicate function used in the `useArrayFindLast` function.
 *
 * @template T - The type of elements in the array.
 * @param {T} element - The current element being processed.
 * @param {number} index - The index of the current element.
 * @param {T[]} array - The array being processed.
 * @returns {boolean} - The result of the predicate function.
 */
export type UseArrayFindLastPredicate<T> = (
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
   *
   * @type {number}
   */
  fromIndex?: number;

  /**
   * The comparator function or key to compare elements.
   *
   * @type {UseArrayIncludesComparatorFn<T, V> | keyof T}
   */
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T;
}

/**
 * Represents a reducer function used in the `useArrayReduce` function.
 *
 * @template PV - The type of the accumulated value.
 * @template CV - The type of the current value being processed.
 * @template R - The type of the returned value.
 * @param {PV} previousValue - The value previously returned in the last invocation of the reducer.
 * @param {CV} currentValue - The current element being processed.
 * @param {number} currentIndex - The index of the current element.
 * @param {CV[]} array - The array being processed.
 * @returns {R} - The result of applying the reducer.
 */
export type UseArrayReduceCallback<PV, CV, R> = (
  previousValue: PV,
  currentValue: CV,
  currentIndex: number,
  array: CV[]
) => R;

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
export type UseSortedCompareFn<T> = (a: T, b: T) => number;

/**
 * Options for the `useSorted` hook.
 *
 * @interface UseSortedOptions
 * @template TestComponent
 * @property {Function} [sortFn] - Custom sort function to use instead of the default.
 * @property {UseSortedCompareFn<T>} [compareFn] - Comparison function for sorting elements.
 * @property {boolean} [dirty] - Flag indicating whether to mutate the original array.
 */
export interface UseSortedOptions<T> {
  sortFn?: (arr: T[], compareFn?: UseSortedCompareFn<T>) => T[];
  compareFn?: UseSortedCompareFn<T>;
  dirty?: boolean;
}
