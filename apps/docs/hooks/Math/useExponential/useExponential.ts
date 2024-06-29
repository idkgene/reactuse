import { useState, useCallback } from 'react';

interface UseExponentialOptions {
  initialBase?: number;
}

interface useExponentialReturn {
  base: number;
  setBase: React.Dispatch<React.SetStateAction<number>>;
  calculate: (exponent: number) => number | null;
}

const useExponential = (options: UseExponentialOptions = {}): useExponentialReturn => {
  const { initialBase = Math.E } = options;
  const [base, setBase] = useState<number>(initialBase);

  const calculate = useCallback(
    (exponent: number) => {
      try {
        const result = Math.pow(base, exponent);
        if (!isFinite(result)) {
          throw new Error('Result is not a finite number');
        }
        return result;
      } catch (error) {
        console.error('Error in useExponential:', error);
        return null;
      }
    },
    [base],
  );

  return { base, setBase, calculate };
};

export { useExponential };
export const exponential = useExponential;
