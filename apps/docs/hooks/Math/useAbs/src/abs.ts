import { useCallback } from 'react';

type NumericValue = number;
type NumericFactory = () => number;
type NumericValueOrFactory = NumericValue | NumericFactory;

function useAbs(
  input: NumericValueOrFactory,
): NumericValue | (() => NumericValue) {
  const computeAbsoluteValue = useCallback(
    (value: NumericValueOrFactory): NumericValue => {
      const resolvedValue =
        typeof value === 'function' ? (value as NumericFactory)() : value;

      if (Number.isNaN(resolvedValue)) {
        throw new Error('Invalid input: value must not be NaN');
      }

      return Math.abs(resolvedValue);
    },
    [],
  );

  if (typeof input === 'function') {
    return () => computeAbsoluteValue(input);
  }

  return computeAbsoluteValue(input);
}

export { useAbs };
