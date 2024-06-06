import { useMemo } from 'react';

type ValueOrFunction<T> = T | (() => T);

function resolveValue<T>(value: ValueOrFunction<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useAverage(...args: any[]): number {
  const values = useMemo(() => {
    return Array.isArray(args[0]) ? args[0] : args;
  }, [JSON.stringify(args)]);

  return useMemo(() => {
    const resolvedValues = values.map(resolveValue);
    const sum = resolvedValues.reduce((acc, val) => acc + val, 0);
    return sum / resolvedValues.length;
  }, [JSON.stringify(values)]);
}
