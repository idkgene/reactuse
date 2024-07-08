import { useCallback } from 'react';

type FactorialInput = number;
type FactorialOutput = bigint;

type FactorialFunction = (n: FactorialInput) => FactorialOutput;

export const useFactorial = (): FactorialFunction => {
  return useCallback((n: FactorialInput): FactorialOutput => {
    if (!Number.isInteger(n)) {
      throw new Error('Factorial is only defined for integers');
    }

    if (n < 0) {
      throw new Error(
        'Factorial is only defined for non-negative integers',
      );
    }

    if (n > Number.MAX_SAFE_INTEGER) {
      throw new Error('Input exceeds maximum safe integer');
    }

    let result: FactorialOutput = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
      result *= i;
    }

    return result;
  }, []);
};
