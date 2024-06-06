import { useMemo } from 'react';

type ValueOfFunction<T> = T | (() => T);

export type ProjectorFunction<T, U> = (
  value: T,
  fromMin: T,
  fromMax: T,
  toMin: U,
  toMax: U
) => U;

function defaultProjector(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

export function useProjection(
  input: ValueOfFunction<number>,
  fromDomain: ValueOfFunction<readonly [number, number]>,
  toDomain: ValueOfFunction<readonly [number, number]>,
  projector: ProjectorFunction<number, number> = defaultProjector
): number {
  const inputValue = typeof input === 'function' ? input() : input;
  const [fromMin, fromMax] = Array.isArray(fromDomain)
    ? fromDomain
    : typeof fromDomain === 'function'
      ? fromDomain()
      : fromDomain;
  const [toMin, toMax] = Array.isArray(toDomain)
    ? toDomain
    : typeof toDomain === 'function'
      ? toDomain()
      : toDomain;

  const projected = useMemo(() => {
    return projector(inputValue, fromMin, fromMax, toMin, toMax);
  }, [inputValue, fromMin, fromMax, toMin, toMax, projector]);

  return projected;
}
