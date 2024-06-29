import { type MutableRefObject } from 'react';

export type Defined<T> = Exclude<T, null | undefined>;

export type UseAsyncQueueTask<T> = (...args: []) => T | Promise<T>;

export interface UseAsyncQueueResult<T> {
  state: 'aborted' | 'fulfilled' | 'pending' | 'rejected';
  data: T | null;
}

export interface UseAsyncQueueReturn<T extends unknown[]> {
  activeIndex: number;
  result: {
    [P in keyof T]: UseAsyncQueueResult<T[P]>;
  };
}

export interface UseAsyncQueueOptions {
  interrupt?: boolean;
  onError?: () => void;
  onFinished?: () => void;
  signal?: AbortSignal;
}

export interface UseClonedOptions<T> {
  clone?: (source: T) => T;
  manual?: boolean;
}

export interface UseClonedReturn<T> {
  cloned?: MutableRefObject<T>;
  sync: () => void;
}

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export interface UseCounterResult {
  count: number;
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

export interface UseCycleListOptions<T> {
  initialValue?: T;
  fallbackIndex?: number;
  getIndexOf?: (value: T, list: T[]) => number;
}

export interface UseCycleListReturn<T> {
  state: T;
  index: number;
  next: (n?: number) => T;
  prev: (n?: number) => T;
  go: (i: number) => T;
}

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface DebounceFilterOptions {
  maxWait?: number;
  rejectOnCancel?: boolean;
}

export type DestructibleObject<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

export type DestructibleArray<A extends readonly []> = {
  [K in keyof A]: A[K];
};

export type MakeDestructibleResult<
  T extends Record<string, unknown>,
  A extends readonly unknown[],
> = T & { [K in keyof A]: A[K] };

export type LanguageCode = string;

export interface UsePreferredLanguageOptions {
  onLanguageChange?: (languageCode: LanguageCode) => void;
  initialLanguage?: LanguageCode;
}

export type PreviousValue<T> = T | undefined;

export type SupportCheckCallback = () => unknown;

export type FunctionArgs = [];

export type PromiseType<T extends FunctionArgs> = (...args: T) => Promise<void>;

export type CallbackType<T extends FunctionArgs> = (...args: T) => void;

export interface UseTimeoutPollOptions {
  immediate?: boolean;
}

export interface Pausable {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

export interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: Truthy;
  falsyValue?: Falsy;
}

export interface UseToNumberOptions {
  method?: 'parseFloat' | 'parseInt';
  radix?: number;
  nanToZero?: boolean;
}

export type Resolvable<T> = T | (() => T);
