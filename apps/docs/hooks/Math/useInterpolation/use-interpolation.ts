import { useCallback } from 'react';

type InterpolationFunction = (
  start: number,
  end: number,
  amount: number,
) => number;

const useInterpolation = (): InterpolationFunction => {
  return useCallback((start: number, end: number, amount: number) => {
    return start * (1 - amount) + end * amount;
  }, []);
};

export { useInterpolation };
export const interpolation = useInterpolation;