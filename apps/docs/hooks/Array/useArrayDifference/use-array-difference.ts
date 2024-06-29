import { useMemo } from 'react';

export type UseArrayDifferenceComparatorFn<T> = (
  element: T,
  value: T,
) => boolean;

export type UseArrayDifferenceKey<T> =
  | keyof T
  | UseArrayDifferenceComparatorFn<T>;

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
