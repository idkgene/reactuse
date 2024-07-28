import { useMemo, useCallback } from 'react';

type MaybeRef<T> = T | (() => T);

function useArrayMap<T, U = T>(
  list: MaybeRef<readonly MaybeRef<T>[]>,
  fn: (element: T, index: number, array: readonly T[]) => U,
): readonly U[] {
  const memoizedFn = useCallback(fn, [fn]);

  const result = useMemo(() => {
    const resolveRef = <V>(ref: MaybeRef<V>): V =>
      typeof ref === 'function' ? (ref as () => V)() : ref;

    const resolvedList = resolveRef(list);

    if (!Array.isArray(resolvedList)) {
      console.warn('useArrayMap: provided list is not an array');
      return [];
    }

    const resolvedArray = resolvedList.map(resolveRef);

    return Object.freeze(resolvedArray.map(memoizedFn));
  }, [list, memoizedFn]);

  return result;
}

export { useArrayMap };
