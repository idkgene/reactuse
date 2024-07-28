import { useCallback } from 'react';

type UseArrayIncludesComparatorFn<T, V> = (
  element: T,
  value: V,
  index: number,
  array: readonly T[],
) => boolean;

interface UseArrayIncludesOptions<T, V> {
  fromIndex?: number;
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T;
}

function useArrayIncludes<T, V = T>(
  list: readonly T[] | null | undefined,
  value: V,
  options?: UseArrayIncludesOptions<T, V>,
): boolean {
  const checkIncludes = useCallback(() => {
    if (!Array.isArray(list)) {
      console.warn('useArrayIncludes: list is not an array');
      return false;
    }

    const { fromIndex = 0, comparator } = options ?? {};

    if (list.length === 0) {
      return false;
    }

    if (typeof comparator === 'function') {
      return list.some((element, index, array) =>
        comparator(element as T, value, index, array),
      );
    }

    if (typeof comparator === 'string') {
      return list.some((element) => {
        if (typeof element !== 'object' || element === null) {
          console.error('useArrayIncludes: Element is not an object');
          return false;
        }
        return (element as Record<keyof T, unknown>)[comparator] === value;
      });
    }

    if (typeof fromIndex !== 'number' || fromIndex < 0) {
      console.error('useArrayIncludes: Invalid fromIndex');
      return false;
    }

    return list.slice(fromIndex).includes(value as unknown as T);
  }, [list, value, options]);

  const result = checkIncludes();

  return result;
}

export { useArrayIncludes };
