import { useMemo } from 'react';

type Primitive = string | number | boolean | null | undefined;
type Func<T extends Primitive> = () => T;

export type Resolvable<T extends Primitive> = T | Func<T>;

function isFunction<T extends Primitive>(
  value: Resolvable<T>,
): value is Func<T> {
  return typeof value === 'function';
}

function resolveValue<T extends Primitive>(value: Resolvable<T>): T {
  return isFunction(value) ? value() : value;
}

function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid input: expected a number');
  }
}

export function useFloor(value: Resolvable<number>): number {
  return useMemo(() => {
    const resolvedValue = resolveValue(value);
    assertNumber(resolvedValue);
    return Math.floor(resolvedValue);
  }, [value]);
}
