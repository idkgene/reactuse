import { useMemo } from 'react';

export type UseSortedCompareFn<T> = (a: T, b: T) => number;

export interface UseSortedOptions<T> {
  sortFn?: (arr: T[], compareFn?: UseSortedCompareFn<T>) => T[];
  compareFn?: UseSortedCompareFn<T>;
  dirty?: boolean;
}

export function defaultSortFn<T>(
  arr: T[],
  compareFn?: UseSortedCompareFn<T>,
): T[] {
  return [...arr].sort(compareFn);
}

export function sortArray<T>(
  source: T[],
  compareFn?: UseSortedCompareFn<T>,
  options?: UseSortedOptions<T>,
): T[] {
  if (!Array.isArray(source)) {
    throw new Error('sortArray: source must be an array');
  }

  const { sortFn = defaultSortFn, dirty = false } = options ?? {};

  if (typeof sortFn !== 'function') {
    throw new Error('sortArray: sortFn must be a function');
  }

  if (compareFn && typeof compareFn !== 'function') {
    throw new Error('sortArray: compareFn must be a function');
  }

  if (dirty) {
    if (source.length === 0) {
      return source;
    }
    try {
      source.sort(compareFn);
      return source;
    } catch (error) {
      throw new Error(
        `sortArray: Error during sorting: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  try {
    return sortFn([...source], compareFn);
  } catch (error) {
    throw new Error(
      `sortArray: Error during sorting: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export function useSorted<T>(
  source: T[],
  compareFnOrOptions?: UseSortedCompareFn<T> | UseSortedOptions<T> | null,
  options?: Omit<UseSortedOptions<T>, 'compareFn'> | null,
): T[] {
  if (!Array.isArray(source)) {
    throw new Error('useSorted: source must be an array');
  }

  const compareFn =
    typeof compareFnOrOptions === 'function'
      ? compareFnOrOptions
      : compareFnOrOptions?.compareFn;

  const mergedOptions: UseSortedOptions<T> | undefined =
    typeof compareFnOrOptions === 'object' && compareFnOrOptions !== null
      ? compareFnOrOptions
      : options ?? undefined;

  return useMemo(() => {
    try {
      return sortArray(source, compareFn, mergedOptions);
    } catch (error) {
      console.error('useSorted: Error during sorting:', error);
      return source;
    }
  }, [source, compareFn, mergedOptions]);
}
