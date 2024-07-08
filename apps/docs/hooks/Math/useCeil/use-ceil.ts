import { useMemo } from 'react';

export type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useCeil(value: Resolvable<number>): number {
  return useMemo(() => {
    const resolvedValue = resolveValue(value);

    if (typeof resolvedValue !== 'number' || Number.isNaN(resolvedValue)) {
      throw new Error('Input must be a valid number');
    }

    return Math.ceil(resolvedValue);
  }, [value]);
}

export function isResolvableNumber(
  value: unknown,
): value is Resolvable<number> {
  if (typeof value === 'number') return !Number.isNaN(value);
  if (typeof value === 'function') {
    try {
      return typeof value() === 'number';
    } catch {
      return false;
    }
  }
  return false;
}
