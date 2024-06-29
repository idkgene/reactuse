import { useMemo } from 'react';

export function useArrayMap<T, U = T>(
  list: T[] | null | undefined,
  callback: (element: T, index: number, array: T[]) => U,
): U[] {
  return useMemo(() => {
    if (list === null) {
      console.warn(
        'useArrayMap: list is null or undefined, returning empty array',
      );
      return [];
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayMap: list must be an array');
    }

    if (typeof callback !== 'function') {
      throw new Error('useArrayMap: callback must be a function');
    }

    try {
      return list.map(callback);
    } catch (error) {
      console.error('useArrayMap: Error during mapping:', error);
      return [];
    }
  }, [list, callback]);
}
