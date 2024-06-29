import { useMemo } from 'react';
import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useFloor(value: Resolvable<number>): number {
  const flooredValue = useMemo(() => {
    const resolvedValue = resolveValue(value);
    return Math.floor(resolvedValue);
  }, [value]);

  return flooredValue;
}
