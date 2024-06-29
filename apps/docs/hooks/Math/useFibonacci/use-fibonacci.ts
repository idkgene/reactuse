import { useState, useCallback } from 'react';

interface UseFibonacciReturn {
  sequence: number[];
  generate: (n: number) => number[] | null;
}

const useFibonacci = (): UseFibonacciReturn => {
  const [sequence, setSequence] = useState<number[]>([]);

  const generate = useCallback((n: number) => {
    try {
      if (n < 0 || !Number.isInteger(n)) {
        throw new Error(
          'Number of Fibonacci numbers must be a non-negative integer',
        );
      }
      const fib: number[] = [];
      for (let i = 0; i < n; i++) {
        if (i <= 1) {
          fib.push(i);
        } else {
          fib.push(fib[i - 1] + fib[i - 2]);
        }
      }
      setSequence(fib);
      return fib;
    } catch (error) {
      console.error('Error in Fibonacci sequence generation:', error);
      setSequence([]);
      return null;
    }
  }, []);

  return { sequence, generate };
};

export { useFibonacci };
export const fibonacci = useFibonacci;
