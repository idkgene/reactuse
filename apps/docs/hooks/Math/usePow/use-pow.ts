import { useState, useCallback, useMemo } from 'react';

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<A> = (value: A) => void;

interface UsePowOptions {
  initialBase?: number;
  initialExponent?: number;
}

interface UsePowReturn {
  readonly base: number;
  setBase: Dispatch<SetStateAction<number>>;
  readonly exponent: number;
  setExponent: Dispatch<SetStateAction<number>>;
  readonly result: number;
}

const isValidNumber = (value: number): boolean => Number.isFinite(value);

const validateNumber = (value: number, name: string): void => {
  if (!isValidNumber(value)) {
    throw new Error(`${name} must be a finite number`);
  }
};

export const usePow = ({
  initialBase = 0,
  initialExponent = 1,
}: UsePowOptions = {}): UsePowReturn => {
  const [base, setBase] = useState(() => {
    validateNumber(initialBase, 'initialBase');
    return initialBase;
  });

  const [exponent, setExponent] = useState(() => {
    validateNumber(initialExponent, 'initialExponent');
    return initialExponent;
  });

  const setValidatedState = useCallback(
    (setter: Dispatch<SetStateAction<number>>, name: string) =>
      (value: SetStateAction<number>) => {
        setter((prevValue) => {
          const newValue =
            typeof value === 'function' ? value(prevValue) : value;
          validateNumber(newValue, name);
          return newValue;
        });
      },
    [],
  );

  const setBaseWithValidation = useMemo(
    () => setValidatedState(setBase, 'base'),
    [setValidatedState],
  );

  const setExponentWithValidation = useMemo(
    () => setValidatedState(setExponent, 'exponent'),
    [setValidatedState],
  );

  const result = useMemo(() => {
    try {
      const calculatedResult = Math.pow(base, exponent);
      if (!isValidNumber(calculatedResult)) {
        throw new Error('Result is not a finite number');
      }
      return calculatedResult;
    } catch (error) {
      console.error('Error calculating power:', error);
      return NaN;
    }
  }, [base, exponent]);

  return useMemo(
    () => ({
      base,
      setBase: setBaseWithValidation,
      exponent,
      setExponent: setExponentWithValidation,
      result,
    }),
    [base, setBaseWithValidation, exponent, setExponentWithValidation, result],
  );
};

export type { UsePowOptions, UsePowReturn };
