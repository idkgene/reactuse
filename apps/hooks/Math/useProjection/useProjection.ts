import { useMemo } from 'react';
import type { Resolvable, ProjectorFunction } from '../math';

/**
 * Default projector function that maps a value from one numerical range to another.
 *
 * @param {number} value - The input value to project.
 * @param {number} fromMin - The minimum value of the input range.
 * @param {number} fromMax - The maximum value of the input range.
 * @param {number} toMin - The minimum value of the output range.
 * @param {number} toMax - The maximum value of the output range.
 * @returns {number} The projected value in the output range.
 */
function defaultProjector(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

/**
 * Custom React hook that projects a value from one range to another using a specified projector function.
 *
 * @param {Resolvable<number>} input - The input value to project.
 * @param {Resolvable<readonly [number, number]>} fromDomain - The input range [min, max].
 * @param {Resolvable<readonly [number, number]>} toDomain - The output range [min, max].
 * @param {ProjectorFunction<number, number>} [projector=defaultProjector] - The function to project the value.
 * @returns {number} The projected value in the output range.
 *
 * @example
 * const projectedValue = useProjection(0.5, [0, 1], [0, 100]); // Returns `50`.
 * const projectedValueWithFn = useProjection(() => 0.25, [0, 1], () => [0, 200]); // Returns `50`.
 */
export function useProjection(
  input: Resolvable<number>,
  fromDomain: Resolvable<readonly [number, number]>,
  toDomain: Resolvable<readonly [number, number]>,
  projector: ProjectorFunction<number, number> = defaultProjector
): number {
  const inputValue =
    typeof input === 'function' ? (input as () => number)() : input;

  const [fromMin, fromMax] =
    typeof fromDomain === 'function'
      ? (fromDomain as () => readonly [number, number])()
      : fromDomain;

  const [toMin, toMax] =
    typeof toDomain === 'function'
      ? (toDomain as () => readonly [number, number])()
      : toDomain;

  const projected = useMemo(() => {
    return projector(inputValue, fromMin, fromMax, toMin, toMax);
  }, [inputValue, fromMin, fromMax, toMin, toMax, projector]);

  return projected;
}
