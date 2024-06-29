import { useMemo } from 'react';

export type UseArrayFindPredicate<T> = (
  element: T,
  index: number,
  array: T[],
) => boolean;

export function useArrayFind<T>(
  list: T[] | null | undefined,
  predicate: UseArrayFindPredicate<T>,
): T | undefined {
  return useMemo(() => {
    if (list === null) {
      console.warn('useArrayFind: list is null or undefined');
      return undefined;
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayFind: list must be an array');
    }

    if (typeof predicate !== 'function') {
      throw new Error('useArrayFind: predicate must be a function');
    }

    if (list.length === 0) {
      return undefined;
    }

    try {
      return list.find(predicate);
    } catch (error) {
      console.error('useArrayFind: Error during execution:', error);
      return undefined;
    }
  }, [list, predicate]);
}
