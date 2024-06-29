import { useMemo, useCallback } from 'react';

export function useArrayUnique<T>(
  items: T[] | null | undefined,
  compareFn?: (a: T, b: T, array: T[]) => boolean,
): T[] {
  const compareItems = useCallback(
    (a: T, b: T, array: T[]): boolean => {
      if (compareFn) {
        try {
          return compareFn(a, b, array);
        } catch (error) {
          console.error('Error in custom compare function:', error);
          return false;
        }
      }
      return JSON.stringify(a) === JSON.stringify(b);
    },
    [compareFn],
  );

  return useMemo(() => {
    if (items === null) {
      throw new Error('useArrayUnique: items is null or undefined');
    }

    if (!Array.isArray(items)) {
      throw new Error('useArrayUnique: items is not an array');
    }

    try {
      const uniqueItems: T[] = [];

      items.forEach((item) => {
        if (
          !uniqueItems.some((uniqueItem) =>
            compareItems(item, uniqueItem, items),
          )
        ) {
          uniqueItems.push(item);
        }
      });
      return uniqueItems;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `useArrayUnique: Error during execution: ${error.message}`,
        );
      } else {
        throw new Error('useArrayUnique: An unknown error occurred');
      }
    }
  }, [items, compareItems]);
}
