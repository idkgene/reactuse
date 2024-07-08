import { useState, useCallback, useMemo } from 'react';

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<A> = (value: A) => void;

interface UsePercentageOptions {
  initialValue?: number;
  total?: number;
}

interface UsePercentageReturn {
  readonly value: number;
  setPercentage: Dispatch<SetStateAction<number>>;
  getAbsolute: () => number;
}

const validatePercentage = (value: number): void => {
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error('Percentage must be a finite number between 0 and 100');
  }
};

const validateTotal = (value: number): void => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error('Total must be a finite number greater than 0');
  }
};

const usePercentage = ({
  initialValue = 0,
  total = 100,
}: UsePercentageOptions = {}): UsePercentageReturn => {
  const [value, setValue] = useState<number>(() => {
    validatePercentage(initialValue);
    return initialValue;
  });

  useMemo(() => {
    validateTotal(total);
  }, [total]);

  const setPercentage = useCallback((newValue: SetStateAction<number>) => {
    setValue((prevValue) => {
      const nextValue =
        typeof newValue === 'function' ? newValue(prevValue) : newValue;
      validatePercentage(nextValue);
      return nextValue;
    });
  }, []);

  const getAbsolute = useCallback((): number => {
    return (value / 100) * total;
  }, [value, total]);

  return useMemo(
    () => ({
      value,
      setPercentage,
      getAbsolute,
    }),
    [value, setPercentage, getAbsolute],
  );
};

export { usePercentage, usePercentage as percentage };
export type { UsePercentageOptions, UsePercentageReturn };
