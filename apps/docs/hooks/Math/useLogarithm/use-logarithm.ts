import { useState, useCallback, useMemo } from 'react';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface UseLogarithmOptions {
  initialBase?: number;
}

interface UseLogarithmReturn {
  readonly base: number;
  setBase: SetState<number>;
  calculate: (value: number) => number;
}

function validateLogarithmInputs(value: number, base: number): void {
  if (value <= 0) {
    throw new Error('Logarithm value must be greater than 0');
  }
  if (base <= 0) {
    throw new Error('Logarithm base must be greater than 0');
  }
  if (base === 1) {
    throw new Error('Logarithm base cannot be 1');
  }
}

function useLogarithm({
  initialBase = Math.E,
}: UseLogarithmOptions = {}): UseLogarithmReturn {
  const [base, setBase] = useState<number>(() => {
    validateLogarithmInputs(1, initialBase);
    return initialBase;
  });

  const calculate = useCallback(
    (value: number): number => {
      validateLogarithmInputs(value, base);
      return Math.log(value) / Math.log(base);
    },
    [base],
  );

  return useMemo(
    () => ({
      base,
      setBase: (newBase: React.SetStateAction<number>) => {
        setBase((prevBase) => {
          const nextBase =
            typeof newBase === 'function' ? newBase(prevBase) : newBase;
          validateLogarithmInputs(1, nextBase);
          return nextBase;
        });
      },
      calculate,
    }),
    [base, calculate],
  );
}

export { useLogarithm, useLogarithm as logarithm };
export type { UseLogarithmOptions, UseLogarithmReturn };
