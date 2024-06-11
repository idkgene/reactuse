import { useState, useEffect } from 'react';
import type { Resolvable } from '../math';
import { resolve } from 'path';

/**
 * Resolves a value, whether it's a plain value or a function that returns a value.
 *
 * @template T The type of the resolved value.
 * @param {Resolvable<T>} resolvable - A value or a function that returns a value.
 * @returns {T} The resolved value.
 */
function resolveResolvable<T>(Resolvable: Resolvable<T>): T {
  return typeof Resolvable === 'function'
    ? (Resolvable as () => T)()
    : Resolvable;
}

/**
 * Custom React hook that computes and returns the absolute value of a given number.
 *
 * @param {number | (() => number)} value - A number or a function that returns a number.
 * @returns {number} The absolute value of the provided number.
 *
 * @example
 * const absValue = useAbs(-10); // Returns `10`.
 */
export function useAbs(value: number | (() => number)): number {
  const [absValue, setAbsValue] = useState(() =>
    Math.abs(resolveResolvable(value))
  );

  useEffect(() => {
    setAbsValue(Math.abs(resolveResolvable(value)));
  }, [resolveResolvable(value)]);

  return absValue;
}
