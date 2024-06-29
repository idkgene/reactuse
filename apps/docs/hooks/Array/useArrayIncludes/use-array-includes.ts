import { useMemo } from 'react';

export type UseArrayIncludesComparatorFn<T, V> = (
  element: T,
  value: V,
  index: number,
  array: T[],
) => boolean;

export interface UseArrayIncludesOptions<T, V> {
  fromIndex?: number;
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T;
}

export function useArrayIncludes<T, V = T>(
  list: T[] | null | undefined,
  value: V,
  options?: UseArrayIncludesOptions<T, V>,
): boolean {
  const { fromIndex = 0, comparator } = options ?? {};

  return useMemo(() => {
    if (list === null || !Array.isArray(list)) {
      console.warn(
        'useArrayIncludes: list is null, undefined, or not an array',
      );
      return false;
    }

    if (list.length === 0) {
      return false;
    }

    if (typeof comparator === 'function') {
      return list.some((element, index, array) =>
        comparator(element, value, index, array),
      );
    }

    if (typeof comparator === 'string') {
      if (
        typeof list[0] !== 'object' ||
        list[0] === null ||
        !(comparator in list[0])
      ) {
        console.error(
          `useArrayIncludes: Invalid comparator key: ${comparator}`,
        );
        return false;
      }
      return list.some((element) => {
        const typedElement = element as Record<keyof T, unknown>;
        return typedElement[comparator] === value;
      });
    }

    if (typeof fromIndex === 'number' && fromIndex >= 0) {
      return list.includes(value as unknown as T, fromIndex);
    }

    console.error('useArrayIncludes: Invalid options provided');
    return false;
  }, [list, value, fromIndex, comparator]);
}
