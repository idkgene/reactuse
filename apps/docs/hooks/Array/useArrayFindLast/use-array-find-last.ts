import { useMemo, useCallback } from 'react';

type Predicate<T> = (element: T, index: number, array: readonly T[]) => boolean;

function useArrayFindLast<T>(
  list: readonly T[] | (() => readonly T[]),
  predicate: Predicate<T>,
): T | undefined {
  const memoizedPredicate = useCallback(predicate, [predicate]);

  const result = useMemo(() => {
    const array = typeof list === 'function' ? list() : list;

    if (!Array.isArray(array)) {
      throw new TypeError(
        'Input must be an array or a function returning an array',
      );
    }

    for (let i = array.length - 1; i >= 0; i--) {
      try {
        if (memoizedPredicate(array[i] as T, i, array)) {
          return { value: array[i] as T, index: i };
        }
      } catch (error) {
        console.error(
          `Error in predicate for element at index ${i.toString()}:`,
          error,
        );
      }
    }

    return undefined;
  }, [list, memoizedPredicate]);

  return result?.value;
}

export { useArrayFindLast };
