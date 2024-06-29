import { useEffect, useRef } from 'react';
import { type Defined } from '../utilities';

function isDefined<T>(value: T): value is Defined<T> {
  return value !== null && value !== undefined;
}

export function useIsDefined<T>(value: T | null | undefined): value is Defined<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  try {
    if (typeof value === 'function') {
      throw new Error('Functions are not supported in useIsDefined');
    }

    return isDefined(ref.current);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in useIsDefined: ${error.message}`);
    } else {
      console.error('An unexpected error occurred in useIsDefined');
    }
    return false;
  }
}
