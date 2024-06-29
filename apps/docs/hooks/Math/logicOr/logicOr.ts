import { useMemo } from 'react';

export type Resolvable<T> = T | (() => T);

function resolveValue<T>(value: Resolvable<T>): T {
  try {
    return typeof value === 'function' ? (value as () => T)() : value;
  } catch (error) {
    console.error('Error resolving value:', error);
    throw new Error('Failed to resolve value');
  }
}

export function logicOr(...args: Resolvable<any>[]): boolean {
  return useMemo(() => {
    if (args.length === 0) {
      console.warn('logicOr called with no arguments');
      return false;
    }

    try {
      return args.some((arg) => {
        try {
          return resolveValue(arg);
        } catch (error) {
          console.warn('Error evaluating argument in logicOr:', error);
          return false;
        }
      });
    } catch (error) {
      console.error('Unexpected error in logicOr:', error);
      return false;
    }
  }, args);
}

export { logicOr as or };
