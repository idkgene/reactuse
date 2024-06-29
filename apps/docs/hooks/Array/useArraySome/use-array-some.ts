import { useMemo } from 'react';

export function useArraySome<T>(
  list: T[] | undefined | null,
  predicate: (element: T, index: number, array: T[]) => unknown,
): boolean {
  return useMemo(() => {
    if (list === null) {
      throw new Error('useArraySome: list is null or undefined');
    }

    if (!Array.isArray(list)) {
      throw new Error('useArraySome: list is not an array');
    }

    if (typeof predicate !== 'function') {
      throw new Error('useArraySome: predicate is not a function');
    }

    try {
      return list.some(predicate);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `useArraySome: Error during execution: ${error.message}`,
        );
      } else {
        throw new Error('useArraySome: An unknown error occurred');
      }
    }
  }, [list, predicate]);
}
