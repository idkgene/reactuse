import { useMemo } from 'react';

export function useArrayJoin<T>(
  list: T[] | null | undefined,
  separator?: string,
): string {
  return useMemo(() => {
    if (list === null) {
      console.warn(
        'useArrayJoin: list is null or undefined, returning empty string',
      );
      return '';
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayJoin: list must be an array');
    }

    try {
      return list.join(separator);
    } catch (error) {
      console.error('useArrayJoin: Error during join operation:', error);
      return '';
    }
  }, [list, separator]);
}
