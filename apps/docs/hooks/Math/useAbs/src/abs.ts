import { useCallback } from 'react';

type NumericValue = number;
type NumericFactory = () => number;
type NumericValueOrFactory = NumericValue | NumericFactory;

function isNumericFactory(
  value: NumericValueOrFactory,
): value is NumericFactory {
  return typeof value === 'function';
}

function useAbs(
  input: NumericValueOrFactory,
): NumericValue | (() => NumericValue) {
  const computeAbsoluteValue = useCallback(
    (value: NumericValueOrFactory): NumericValue => {
      const resolvedValue = isNumericFactory(value) ? value() : value;

      if (Number.isNaN(resolvedValue) || !Number.isFinite(resolvedValue)) {
        throw new Error(
          `Invalid input: value must be a finite number. Received: ${resolvedValue}`,
        );
      }

      return Math.abs(resolvedValue);
    },
    [],
  );

  if (isNumericFactory(input)) {
    return () => computeAbsoluteValue(input);
  }

  return computeAbsoluteValue(input);
}

export { useAbs };
