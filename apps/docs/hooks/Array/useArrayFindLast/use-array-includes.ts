import { useCallback, useMemo } from 'react';

export type UseArrayFindLastPredicate<T> = (
  element: T,
  index: number,
  array: T[],
) => boolean;

export function useArrayFindLast<T>(
  list: T[] | null | undefined,
  predicate: UseArrayFindLastPredicate<T>,
): T | undefined {
  const memoizedPredicate = useCallback(predicate, [predicate]);

  return useMemo(() => {
    if (list === null) {
      console.warn('useArrayFindLast: list is null or undefined');
      return undefined;
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayFindLast: list must be an array');
    }

    if (typeof memoizedPredicate !== 'function') {
      throw new Error('useArrayFindLast: predicate must be a function');
    }

    if (list.length === 0) {
      return undefined;
    }

    try {
      for (let i = list.length - 1; i >= 0; i--) {
        if (memoizedPredicate(list[i], i, list)) {
          return list[i];
        }
      }
    } catch (error) {
      console.error('useArrayFindLast: Error during execution:', error);
    }

    return undefined;
  }, [list, memoizedPredicate]);
}
