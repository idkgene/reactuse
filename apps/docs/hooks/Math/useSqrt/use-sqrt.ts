import { useState, useCallback, useMemo } from 'react';

type SetStateAction<T> = T | ((prevState: T) => T);

interface UseSqrtOptions {
  initialValue?: number;
}

interface UseSqrtResult {
  readonly value: number;
  readonly setValue: (action: SetStateAction<number>) => void;
  readonly sqrt: () => number;
}

const useSqrt = ({ initialValue = 0 }: UseSqrtOptions = {}): UseSqrtResult => {
  const [value, setValue] = useState<number>(initialValue);

  const sqrt = useCallback((): number => {
    if (value < 0) {
      throw new Error(
        `Cannot calculate square root of a negative number: ${String(value)}`,
      );
    }
    return Math.sqrt(value);
  }, [value]);

  const setValueCallback = useCallback((action: SetStateAction<number>) => {
    setValue((prevValue) => {
      const newValue =
        typeof action === 'function' ? action(prevValue) : action;
      return Number.isFinite(newValue) ? newValue : prevValue;
    });
  }, []);

  return useMemo(
    () => ({
      value,
      setValue: setValueCallback,
      sqrt,
    }),
    [value, setValueCallback, sqrt],
  );
};

export { useSqrt };
export type { UseSqrtOptions, UseSqrtResult };
