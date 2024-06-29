import { useCallback } from 'react';

type FactorialFunction = (n: number) => number | null;

const useFactorial = (): FactorialFunction => {
  return useCallback((n: number) => {
    try {
      if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Factorial is only defined for non-negative integers');
      }
      if (n === 0 || n === 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    } catch (error) {
      console.error('Error in factorial calculation:', error);
      return null;
    }
  }, []);
};

export { useFactorial };
export const factorial = useFactorial;
