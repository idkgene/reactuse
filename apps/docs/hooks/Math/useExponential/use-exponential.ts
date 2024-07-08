import { useState, useCallback, useMemo } from 'react';

type UseExponentialOptions = Readonly<{
  initialBase?: number;
}>;

type UseExponentialReturn = Readonly<{
  base: number;
  setBase: (newBase: number) => void;
  calculate: (exponent: number) => number;
}>;

const isValidNumber = (num: number): boolean =>
  (Number.isFinite(num) || num === Infinity || num === -Infinity) &&
  !Number.isNaN(num);

export const useExponential = ({
  initialBase = Math.E,
}: UseExponentialOptions = {}): UseExponentialReturn => {
  if (!isValidNumber(initialBase)) {
    throw new Error('Invalid initial base provided');
  }

  const [base, setBase] = useState<number>(initialBase);

  const setBaseValidated = useCallback((newBase: number): void => {
    if (!isValidNumber(newBase)) {
      throw new Error('Invalid base value');
    }
    setBase(newBase);
  }, []);

  const calculate = useCallback(
    (exponent: number): number => {
      if (!isValidNumber(exponent)) {
        throw new Error('Invalid exponent value');
      }

      const result = Math.pow(base, exponent);

      if (!Number.isFinite(result)) {
        throw new Error('Calculation resulted in a non-finite number');
      }

      return result;
    },
    [base],
  );

  return useMemo(
    () => ({ base, setBase: setBaseValidated, calculate }),
    [base, setBaseValidated, calculate],
  );
};

export default useExponential;
