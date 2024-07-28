import { useCallback, useMemo } from 'react';

type ArrayOrGetter<T> = T[] | (() => T[]);

function useArrayChunk<T>(array: ArrayOrGetter<T>, size: number): T[][] {
  const memoizedGetter = useCallback(() => {
    return typeof array === 'function' ? array() : array;
  }, [array]);

  return useMemo(() => {
    const resolvedArray = memoizedGetter();

    if (!Array.isArray(resolvedArray)) {
      throw new Error(
        'The first argument must be an array or a function returning an array',
      );
    }

    if (!Number.isInteger(size) || size <= 0) {
      throw new Error('Chunk size must be a positive integer');
    }

    const result: T[][] = [];
    for (let i = 0; i < resolvedArray.length; i += size) {
      result.push(resolvedArray.slice(i, i + size));
    }

    return result;
  }, [memoizedGetter, size]);
}

export { useArrayChunk };
