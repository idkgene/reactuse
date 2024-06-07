import { useMemo } from 'react';

type ValueOfFunction<T> = T | (() => T);

function resolveValue<T>(value: ValueOfFunction<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function logicOr(...args: ValueOfFunction<any>[]): boolean {
  return useMemo(() => {
    return args.some(arg => resolveValue(arg));
  }, args);
}

export { logicOr as or };
