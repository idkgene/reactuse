import { useMemo } from 'react';

/**
 * A function type for comparing two elements of type T.
 * @typeParam T - The type of the elements to compare.
 * @param element - The first element to compare.
 * @param value - The second element to compare.
 * @returns A boolean indicating whether the elements are considered equal.
 */
export type UseArrayDifferenceComparatorFn<T> = (
  element: T,
  value: T,
) => boolean;

/**
 * The key or comparison function used for array difference calculation.
 * @typeParam T - The type of elements in the arrays.
 */
export type UseArrayDifferenceKey<T> =
  | keyof T
  | UseArrayDifferenceComparatorFn<T>;

 /**
 * A custom React hook that calculates the difference between two arrays.
 * 
 * @typeParam T - The type of elements in the arrays, must extend object.
 * @param list - The first array to compare.
 * @param values - The second array to compare against.
 * @param keyOrCompareFn - Optional key or comparison function for complex objects.
 * @returns An array containing elements from 'list' that are not in 'values'.
 * 
 * @throws Error If `list` or `values` are not arrays, or if an invalid key is provided.
 * 
 * @example
 * ```tsx
 * const list = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const values = [{ id: 1, name: 'Alice' }];
 * const result = useArrayDifference(list, values, 'id');
 * // result will be [{ id: 2, name: 'Bob' }]
 * ```
 */ 
export function useArrayDifference<T extends object>(
  list: T[],
  values: T[],
  keyOrCompareFn?: UseArrayDifferenceKey<T>,
): T[] {
  return useMemo(() => {
    if (!Array.isArray(list) || !Array.isArray(values)) {
      throw new Error(
        'useArrayDifference: Both list and values must be arrays',
      );
    }

    if (list.length === 0) {
      return [];
    }

    if (values.length === 0) {
      return [...list];
    }

    try {
      if (typeof keyOrCompareFn === 'function') {
        return list.filter(
          (item) => !values.some((othItem) => keyOrCompareFn(item, othItem)),
        );
      } else if (typeof keyOrCompareFn === 'string') {
        if (list.length > 0 && !(keyOrCompareFn in list[0])) {
          throw new Error(
            `useArrayDifference: Invalid key "${keyOrCompareFn}" for comparison`,
          );
        }
        const key = keyOrCompareFn as keyof T;
        const valuesSet = new Set(values.map((item) => item[key]));
        return list.filter((item) => !valuesSet.has(item[key]));
      } else if (keyOrCompareFn !== undefined) {
        throw new Error('useArrayDifference: Invalid keyOrCompareFn parameter');
      } else {
        const valuesSet = new Set(values);
        return list.filter((item) => !valuesSet.has(item));
      }
    } catch (error) {
      console.error('Error in useArrayDifference:', error);
      throw error;
    }
  }, [list, values, keyOrCompareFn]);
}
