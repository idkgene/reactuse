export type Resolvable<T> = T | (() => T);

export interface PrecisionOptions {
  precision: number;
  value: number;
}

export type FormattedValue = number;

export type UsePrecisionReturn = FormattedValue;

export type ProjectorFunction<T, U> = (
  value: T,
  fromMin: T,
  fromMax: T,
  toMin: U,
  toMax: U,
) => U;

export type RoundNumberFn = (number: number) => void;

type TruncateNumberFn = (number: number) => void;
