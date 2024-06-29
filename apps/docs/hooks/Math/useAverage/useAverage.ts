import { useMemo } from 'react';
import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useAverage(...args: []): number {
  const values = useMemo(() => {
    return Array.isArray(args[0]) ? args[0] : args;
  }, [JSON.stringify(args)]);

  return useMemo(() => {
    const resolvedValues = values.map(resolveValue);
    const sum = resolvedValues.reduce((acc, val) => acc + val, 0);
    return sum / resolvedValues.length;
  }, [JSON.stringify(values)]);
}
