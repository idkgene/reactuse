import { useMemo } from 'react';

export type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

type NumericResolvable = Resolvable<number>;

export function useAverage(
  ...args: NumericResolvable[] | [NumericResolvable[]]
): number {
  const values = useMemo(() => {
    if (args.length === 0) {
      throw new Error('useAverage: At least one argument is required');
    }
    return Array.isArray(args[0]) ? args[0] : args;
  }, [args]);

  return useMemo(() => {
    if (values.length === 0) {
      throw new Error('useAverage: Cannot calculate average of an empty array');
    }

    const resolvedValues = values.map((value, index) => {
      try {
        const resolved = resolveValue(value);
        if (typeof resolved !== 'number' || isNaN(resolved)) {
          throw new Error(`Invalid value at index ${String(index)}`);
        }
        return resolved;
      } catch (error) {
        throw new Error(
          `useAverage: Failed to resolve value at index ${String(index)}: ${(error as Error).message}`,
        );
      }
    });

    const sum = resolvedValues.reduce((acc, val) => acc + val, 0);
    return sum / resolvedValues.length;
  }, [values]);
}
