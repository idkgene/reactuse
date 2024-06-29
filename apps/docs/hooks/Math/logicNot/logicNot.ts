import { useMemo } from 'react';
import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function logicNot(v: Resolvable<any>): boolean {
  return useMemo(() => {
    const resolvedValue = resolveValue(v);
    return !resolvedValue;
  }, [v]);
}

export { logicNot as not };
