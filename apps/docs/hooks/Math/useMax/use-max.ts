import { useMemo } from 'react';

type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

type MaxInput = Resolvable<number> | Resolvable<number>[];

export function useMax(...args: MaxInput[]): number {
  return useMemo(() => {
    if (args.length === 0) {
      throw new Error('useMax: At least one argument is required');
    }

    const values =
      args.length === 1 && Array.isArray(resolveValue(args[0]))
        ? resolveValue(args[0] as Resolvable<number[]>).map(resolveValue)
        : args.map(resolveValue);

    if (values.length === 0) {
      throw new Error('useMax: Empty array provided');
    }

    if (!values.every(isNumber)) {
      throw new Error('useMax: All resolved values must be numbers');
    }

    return Math.max(...values);
  }, [args]);
}
