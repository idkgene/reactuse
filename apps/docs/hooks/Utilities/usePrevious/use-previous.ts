import { useEffect, useRef } from 'react';
import { type PreviousValue } from '../utilities';

export function usePrevious<T>(value: T, initialValue?: T): PreviousValue<T> {
  if (typeof value === 'undefined') {
    throw new Error('Value cannot be undefined');
  }

  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    try {
      ref.current = value;
    } catch (error) {
      console.error('Error in usePrevious:', error);
      throw new Error('An error occurred in usePrevious');
    }
  }, [value]);

  return ref.current;
}
