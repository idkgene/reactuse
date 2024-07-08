import { useMemo } from 'react';

type Primitive = string | number | boolean | null | undefined;
type Func<T extends Primitive> = () => T;
type Resolvable<T extends Primitive> = T | Func<T>;

function isFunction<T extends Primitive>(
  value: Resolvable<T>,
): value is Func<T> {
  return typeof value === 'function';
}

function resolveValue<T extends Primitive>(value: Resolvable<T>): T {
  return isFunction(value) ? value() : value;
}

function validateNumber(value: number, name: string): void {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    throw new Error(
      `Invalid ${name}: ${String(value)}. Expected a finite number.`,
    );
  }
}

export function useClamp(
  value: Resolvable<number>,
  min: Resolvable<number>,
  max: Resolvable<number>,
): number {
  return useMemo(() => {
    const resolvedValue = resolveValue(value);
    const resolvedMin = resolveValue(min);
    const resolvedMax = resolveValue(max);

    validateNumber(resolvedValue, 'value');
    validateNumber(resolvedMin, 'min');
    validateNumber(resolvedMax, 'max');

    if (resolvedMin > resolvedMax) {
      throw new Error(
        `Invalid range: min (${String(resolvedMin)}) is greater than max (${String(resolvedMax)}).`,
      );
    }

    return Math.min(Math.max(resolvedValue, resolvedMin), resolvedMax);
  }, [value, min, max]);
}
