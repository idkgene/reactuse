import { useMemo } from 'react';

type ArrayOrGetter<T> = T[] | (() => T[]);
type FlatMapCallback<T, U> = (
  value: T,
  index: number,
  array: T[],
) => U | readonly U[];

function useArrayFlatMap<T, U>(
  array: ArrayOrGetter<T>,
  callback: FlatMapCallback<T, U>,
): U[] {
  return useMemo(() => {
    const resolvedArray = typeof array === 'function' ? array() : array;

    if (!Array.isArray(resolvedArray)) {
      throw new Error(
        'The first argument must be an array or a function returning an array',
      );
    }

    if (typeof callback !== 'function') {
      throw new Error('The second argument must be a function');
    }

    return resolvedArray.flatMap(callback);
  }, [array, callback]);
}

export { useArrayFlatMap };
