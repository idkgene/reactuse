import { useMemo } from 'react';
import type { Resolvable, ProjectorFunction } from '../math';

function defaultProjector(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
): number {
  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

export function useProjection(
  input: Resolvable<number>,
  fromDomain: Resolvable<readonly [number, number]>,
  toDomain: Resolvable<readonly [number, number]>,
  projector: ProjectorFunction<number, number> = defaultProjector,
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
