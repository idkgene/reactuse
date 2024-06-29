import { useMemo } from 'react';
import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useClamp(
  value: Resolvable<number>,
  min: Resolvable<number>,
  max: Resolvable<number>,
): number {
  const clampedValue = useMemo(() => {
    const resolvedValue = resolveValue(value);
    const resolvedMin = resolveValue(min);
    const resolvedMax = resolveValue(max);

    return Math.min(Math.max(resolvedValue, resolvedMin), resolvedMax);
  }, [value, min, max]);

  return clampedValue;
}
