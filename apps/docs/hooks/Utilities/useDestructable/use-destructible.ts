import { useMemo } from 'react';
import { type MakeDestructibleResult } from '../utilities';

export function useDestructible<
  T extends Record<string, unknown>,
  A extends readonly unknown[],
>(obj: T, arr: A): MakeDestructibleResult<T, A> {
  if (typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }

  if (!Array.isArray(arr)) {
    throw new Error('Second argument must be an array');
  }

  return useMemo(() => {
    try {
      return { ...obj, ...arr };
    } catch (error) {
      console.error('Error in useDestructible:', error);
      throw new Error('An error occurred in useDestructible');
    }
  }, [obj, arr]);
}
