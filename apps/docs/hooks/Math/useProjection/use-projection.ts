import { useMemo } from 'react';

type Resolvable<T> = T | (() => T);

type ProjectorFunction<T extends number, U extends number> = (
  value: T,
  fromMin: T,
  fromMax: T,
  toMin: U,
  toMax: U,
) => U;

type Domain<T extends number> = readonly [T, T];

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

function validateDomain<T extends number>(
  domain: Domain<T>,
  name: string,
): void {
  const [min, max] = domain;
  if (min >= max) {
    throw new Error(`Invalid ${name} domain: min must be less than max`);
  }
}

function defaultProjector<T extends number, U extends number>(
  value: T,
  fromMin: T,
  fromMax: T,
  toMin: U,
  toMax: U,
): U {
  return (((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) +
    toMin) as U;
}

function useProjection<T extends number, U extends number>(
  input: Resolvable<T>,
  fromDomain: Resolvable<Domain<T>>,
  toDomain: Resolvable<Domain<U>>,
  projector: ProjectorFunction<T, U> = defaultProjector as ProjectorFunction<
    T,
    U
  >,
): U {
  return useMemo(() => {
    const inputValue = resolveValue(input);
    const [fromMin, fromMax] = resolveValue(fromDomain);
    const [toMin, toMax] = resolveValue(toDomain);

    validateDomain([fromMin, fromMax], 'input');
    validateDomain([toMin, toMax], 'output');

    if (inputValue < fromMin || inputValue > fromMax) {
      throw new Error(
        `Input value ${String(inputValue)} is outside the input domain [${String(fromMin)}, ${String(fromMax)}]`,
      );
    }

    return projector(inputValue, fromMin, fromMax, toMin, toMax);
  }, [input, fromDomain, toDomain, projector]);
}

export { useProjection };
export type { ProjectorFunction, Domain, Resolvable };
