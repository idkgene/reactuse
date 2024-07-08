import { useMemo } from 'react';

export type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}


export function useMin(...args: any[]): number {
  return useMemo(() => {
    if (args.length === 1 && Array.isArray(resolveValue(args[0]))) {
      const array = resolveValue(args[0]) as Resolvable<number>[];
      return Math.min(...array.map(resolveValue));
    } 
      return Math.min(...args.map(resolveValue));
    
  }, args);
}
