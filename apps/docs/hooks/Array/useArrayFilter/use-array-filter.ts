import { useMemo } from 'react';

export type UseArrayFilterPredicate<T> = (
  element: T,
  index: number,
  array: T[],
) => boolean;

export function useArrayFilter<T>(
  list: T[] | null | undefined,
  predicate: UseArrayFilterPredicate<T>,
): T[] {
  return useMemo(() => {
    if (list === null) {
      console.warn('useArrayFilter: list is null or undefined');
      return [];
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayFilter: list must be an array');
    }

    if (typeof predicate !== 'function') {
      throw new Error('useArrayFilter: predicate must be a function');
    }

    if (list.length === 0) {
      return [];
    }

    try {
      return list.filter(predicate);
    } catch (error) {
      console.error('useArrayFilter: Error during execution:', error);
      return [];
    }
  }, [list, predicate]);
}
