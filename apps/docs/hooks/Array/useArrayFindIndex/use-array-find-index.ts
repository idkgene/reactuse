import { useMemo, useCallback } from 'react';

type ArrayOrFunction<T> = T[] | (() => T[]);

function useArrayFindIndex<T>(
  list: ArrayOrFunction<T>,
  predicate: (element: T, index: number, array: T[]) => boolean,
  deps: React.DependencyList = [],
): number {
  const memoizedPredicate = useCallback(predicate, [predicate, ...deps]);

  const result = useMemo(() => {
    try {
      const array = typeof list === 'function' ? list() : list;

      if (!Array.isArray(array)) {
        throw new Error(
          'Input must be an array or a function returning an array',
        );
      }

      return array.findIndex((element, index, arr) => {
        if (typeof memoizedPredicate !== 'function') {
          throw new Error('Predicate must be a function');
        }
        return memoizedPredicate(element, index, arr);
      });
    } catch (error) {
      console.error('Error in useArrayFindIndex:', error);
      return -1;
    }
  }, [list, memoizedPredicate]);

  return result;
}

export { useArrayFindIndex };
