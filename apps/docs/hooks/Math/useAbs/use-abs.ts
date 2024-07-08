import { useEffect, useState, useCallback } from 'react';

export type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  if (typeof value === 'function') {
    return (value as () => T)();
  }
  return value;
}

export function useAbs(value: Resolvable<number>): number {
  const resolveAndAbs = useCallback((val: Resolvable<number>): number => {
    try {
      const resolvedValue = resolveValue(val);
      if (typeof resolvedValue !== 'number') {
        throw new Error('Value must resolve to a number');
      }
      return Math.abs(resolvedValue);
    } catch (error) {
      console.error('Error in useAbs:', error);
      throw new Error('Failed to resolve or calculate absolute value');
    }
  }, []);

  const [absValue, setAbsValue] = useState(() => resolveAndAbs(value));

  useEffect(() => {
    setAbsValue(resolveAndAbs(value));
  }, [value, resolveAndAbs]);

  return absValue;
}
