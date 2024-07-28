import { useMemo } from 'react';

type PredicateFunction<T> = (
  element: T,
  index: number,
  array: readonly T[],
) => boolean;

function useArrayFilter<T>(
  list: readonly T[] | (() => readonly T[]),
  predicate: PredicateFunction<T>,
): readonly T[] {
  const result = useMemo(() => {
    try {
      const array = typeof list === 'function' ? list() : list;

      if (!Array.isArray(array)) {
        throw new Error(
          'Input must be an array or a function returning an array',
        );
      }

      const typedArray = array as readonly T[];

      return typedArray.filter((element, index, arr) =>
        predicate(element, index, arr),
      );
    } catch (error) {
      console.error('Error in useArrayFilter:', error);
      return [] as readonly T[];
    }
  }, [list, predicate]);

  return result;
}

export { useArrayFilter };
