import { useMemo } from 'react';
import type { Resolvable } from '../math';

/**
 * Resolves a value, whether it's a plain value or a function that returns a value.
 *
 * @template T The type of the resolved value.
 * @param {Resolvable<T>} value - A value or a function that returns a value.
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * React hook that clamps a numerical value between a specified minimum and maximum.
 *
 * @param {Resolvable<number>} value - The value to be clamped.
 * @param {Resolvable<number>} min - The minimum value.
 * @param {Resolvable<number>} max - The maximum value.
 * @returns {number} The clamped value.
 *
 * @example
 * const clamped = useClamp(5, 0, 10); // Returns `5`.
 * const clampedWithFn = useClamp(() => 15, 0, 10); // Returns `10`.
 */
export function useClamp(
  value: Resolvable<number>,
  min: Resolvable<number>,
  max: Resolvable<number>
): number {
  const clampedValue = useMemo(() => {
    const resolvedValue = resolveValue(value);
    const resolvedMin = resolveValue(min);
    const resolvedMax = resolveValue(max);

    return Math.min(Math.max(resolvedValue, resolvedMin), resolvedMax);
  }, [value, min, max]);

  return clampedValue;
}
