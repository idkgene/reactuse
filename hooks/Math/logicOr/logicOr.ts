import { useMemo } from 'react';

type MaybeRefOrGetter<T> = T | (() => T);

function resolveValue<T>(value: MaybeRefOrGetter<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function logicOr(...args: MaybeRefOrGetter<any>[]): boolean {
  return useMemo(() => {
    return args.some(arg => resolveValue(arg));
  }, args);
}

export { logicOr as or };
