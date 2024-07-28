import { useMemo } from 'react';

type ArrayOrGetter<T> = T[] | (() => T[]);

function useArrayIntersection<T>(...arrays: ArrayOrGetter<T>[]): T[] {
  return useMemo(() => {
    if (arrays.length === 0) {
      return [];
    }

    const resolvedArrays = arrays.map((array) =>
      typeof array === 'function' ? array() : array,
    );

    if (!resolvedArrays.every(Array.isArray)) {
      throw new Error(
        'All arguments must be arrays or functions returning arrays',
      );
    }

    const [firstArray, ...restArrays] = resolvedArrays;

    return firstArray.filter((item) =>
      restArrays.every((arr) => arr.includes(item)),
    );
  }, [arrays]);
}

export { useArrayIntersection };
