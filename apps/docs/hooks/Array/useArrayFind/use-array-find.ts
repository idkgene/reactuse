import { useMemo, useCallback } from 'react';

type ArrayOrFunction<T> = T[] | (() => T[]);

export function useArrayFind<T>(
  list: ArrayOrFunction<T>,
  predicate: (element: T, index: number, array: readonly T[]) => boolean,
  deps: readonly unknown[] = [],
): T | undefined {
  const memoizedPredicate = useCallback(predicate, [predicate, ...deps]);

  const result = useMemo(() => {
    const array = typeof list === 'function' ? list() : list;

    if (!Array.isArray(array)) {
      throw new TypeError(
        'The list must be an array or a function that returns an array',
      );
    }

    return array.find(memoizedPredicate);
  }, [list, memoizedPredicate]);

  return result;
}
