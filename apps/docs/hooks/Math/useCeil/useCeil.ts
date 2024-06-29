import { useMemo } from 'react';
import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useCeil(value: Resolvable<number>): number {
  const result = useMemo(() => {
    const resolvedValue = resolveValue(value);
    return Math.ceil(resolvedValue);
  }, [value]);

  return result;
}
