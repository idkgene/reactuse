import { useMemo, useCallback } from 'react';

type ArrayElement<T> = T extends (infer U)[] ? U : never;

type UseArrayEveryPredicate<T> = (
  element: T,
  index: number,
  array: readonly T[],
) => boolean;

function useArrayEvery<T>(
  list: readonly T[] | null | undefined,
  predicate: UseArrayEveryPredicate<ArrayElement<T>>,
): boolean {
  const memoizedPredicate = useCallback(predicate, [predicate]);

  const result = useMemo(() => {
    if (!Array.isArray(list)) {
      return true;
    }

    if (list.length === 0) {
      return true;
    }

    return list.every(memoizedPredicate);
  }, [list, memoizedPredicate]);

  return result;
}

export { useArrayEvery };
