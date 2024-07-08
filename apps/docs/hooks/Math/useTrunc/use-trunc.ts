import { useState, useCallback } from 'react';

interface TruncateResult {
  value: number;
  truncate: (input: number) => void;
}

export function useTrunc(initialValue = 0): TruncateResult {
  if (!Number.isFinite(initialValue)) {
    throw new Error('Initial value must be a finite number');
  }

  const [value, setValue] = useState<number>(Math.trunc(initialValue));

  const truncate = useCallback((input: number): void => {
    if (!Number.isFinite(input)) {
      throw new Error('Input must be a finite number');
    }
    setValue(Math.trunc(input));
  }, []);

  return { value, truncate };
}
