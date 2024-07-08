import { useMemo } from 'react';

type NumericArray = readonly number[];

const sumArray = (array: NumericArray): number => {
  return array.reduce((acc: number, curr: number) => {
    if (typeof curr !== 'number' || !Number.isFinite(curr)) {
      throw new Error('Array must contain only finite numbers');
    }
    return acc + curr;
  }, 0);
};

export const useSum = (array: NumericArray): number => {
  return useMemo(() => {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    return sumArray(array);
  }, [array]);
};

export type { NumericArray };
