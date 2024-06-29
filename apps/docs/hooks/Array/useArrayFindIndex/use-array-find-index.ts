import { useMemo } from 'react';

export type UseArrayFindIndexPredicate<T> = (
  element: T,
  index: number,
  array: T[],
) => boolean;

export function useArrayFindIndex<T>(
  list: T[] | null | undefined,
  predicate: UseArrayFindIndexPredicate<T>,
): number {
  return useMemo(() => {
    if (list === null) {
      console.warn('useArrayFindIndex: list is null or undefined');
      return -1;
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayFindIndex: list must be an array');
    }

    if (typeof predicate !== 'function') {
      throw new Error('useArrayFindIndex: predicate must be a function');
    }

    if (list.length === 0) {
      return -1;
    }

    try {
      return list.findIndex(predicate);
    } catch (error) {
      console.error('useArrayFindIndex: Error during execution:', error);
      return -1;
    }
  }, [list, predicate]);
}
