import { useCallback, useMemo } from 'react';

type Percentage = number & { __brand: 'Percentage' };

const isPercentage = (value: number): value is Percentage =>
  value >= 0 && value <= 1;

const createPercentage = (value: number): Percentage => {
  if (!isPercentage(value)) {
    throw new Error(
      `Invalid percentage value: ${String(value)}. Must be between 0 and 1.`,
    );
  }
  return value;
};

interface InterpolationFunction {
  (start: number, end: number, amount: Percentage): number;
  (start: number, end: number): (amount: Percentage) => number;
}

function useInterpolation(): InterpolationFunction {
  const validateNumber = useCallback((value: number, name: string) => {
    if (!Number.isFinite(value)) {
      throw new Error(
        `Invalid ${name} value: ${String(value)}. Must be a finite number.`,
      );
    }
  }, []);

  return useMemo(() => {
    const interpolate = (start: number, end: number, amount?: Percentage) => {
      if (typeof amount === 'undefined') {
        return (a: Percentage) => interpolate(start, end, a);
      }

      validateNumber(start, 'start');
      validateNumber(end, 'end');

      return start * (1 - amount) + end * amount;
    };

    return interpolate as InterpolationFunction;
  }, [validateNumber]);
}

export { useInterpolation, createPercentage };
export type { Percentage, InterpolationFunction };
