import { useState, useCallback } from 'react';

interface UseLogarithmOptions {
  initialBase?: number;
}

interface UseLogarithmReturn {
  base: number;
  setBase: React.Dispatch<React.SetStateAction<number>>;
  calculate: (value: number) => number | null;
}

const useLogarithm = (options: UseLogarithmOptions = {}): UseLogarithmReturn => {
  const { initialBase = Math.E } = options;
  const [base, setBase] = useState<number>(initialBase);

  const calculate = useCallback(
    (value: number) => {
      try {
        if (value <= 0 || base <= 0 || base === 1) {
          throw new Error('Invalid input for logarithm');
        }
        return Math.log(value) / Math.log(base);
      } catch (error) {
        console.error('Error in useLogarithm:', error);
        return null;
      }
    },
    [base],
  );

  return { base, setBase, calculate };
};

export { useLogarithm };
export const logarithm = useLogarithm;
