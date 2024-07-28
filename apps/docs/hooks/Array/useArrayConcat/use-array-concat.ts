import { useMemo, useCallback } from 'react';

type ArrayOrGetter<T> = T[] | (() => T[]);

function useArrayConcat<T>(...arrays: ArrayOrGetter<T>[]): T[] {
  const concatArrays = useCallback(() => {
    const resolvedArrays = arrays.map((array) =>
      typeof array === 'function' ? array() : array,
    );

    return resolvedArrays.reduce<T[]>((acc, curr) => {
      if (!Array.isArray(curr)) {
        throw new Error(
          'All arguments must be arrays or functions returning arrays',
        );
      }
      return acc.concat(curr);
    }, []);
  }, [arrays]);

  return useMemo(() => concatArrays(), [concatArrays]);
}

export { useArrayConcat };
