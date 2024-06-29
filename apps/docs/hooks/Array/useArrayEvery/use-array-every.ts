import { useMemo } from 'react';

export type UseArrayEveryPredicate<T> = (
  element: T,
  index: number,
  array: T[],
) => unknown;

export function useArrayEvery<T>(
  list: T[] | null | undefined,
  predicate: UseArrayEveryPredicate<T>,
): boolean {
  return useMemo(() => {
    if (list === null) {
      console.warn('useArrayEvery: list is null or undefined');
      return false;
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayEvery: list must be an array');
    }

    if (typeof predicate !== 'function') {
      throw new Error('useArrayEvery: predicate must be a function');
    }

    if (list.length === 0) {
      return true;
    }

    try {
      return list.every(predicate);
    } catch (error) {
      console.error('useArrayEvery: Error during execution:', error);
      return false;
    }
  }, [list, predicate]);
}
