import { useState, useCallback } from 'react';

interface UsePowOptions {
  initialBase?: number;
  initialExponent?: number;
}

interface UsePowReturn {
  base: number;
  setBase: React.Dispatch<React.SetStateAction<number>>;
  exponent: number;
  setExponent: React.Dispatch<React.SetStateAction<number>>;
  calculate: () => number | null;
}

const usePow = (options: UsePowOptions = {}): UsePowReturn => {
  const { initialBase = 0, initialExponent = 1 } = options;
  const [base, setBase] = useState<number>(initialBase);
  const [exponent, setExponent] = useState<number>(initialExponent);

  const calculate = useCallback(() => {
    try {
      const result = Math.pow(base, exponent);
      if (!isFinite(result)) {
        throw new Error('Result is not a finite number');
      }
      return result;
    } catch (error) {
      console.error('Error in usePow:', error);
      return null;
    }
  }, [base, exponent]);

  return { base, setBase, exponent, setExponent, calculate };
};

export { usePow };
export const pow = usePow;
