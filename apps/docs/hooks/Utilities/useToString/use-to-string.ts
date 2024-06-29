import { useMemo } from 'react';
import { type Resolvable } from '../utilities';

export function useToString<T>(value: Resolvable<T>): string {
  return useMemo(() => {
    let resolvedValue: T;

    try {
      resolvedValue =
        typeof value === 'function' ? (value as () => T)() : value;
    } catch (error) {
      throw new Error(
        `Failed to resolve the value: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    if (resolvedValue === undefined || resolvedValue === null) {
      throw new Error('Cannot convert undefined or null to string');
    }

    try {
      return String(resolvedValue);
    } catch (error) {
      throw new Error(
        `Failed to convert value to string: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }, [value]);
}
