import * as React from 'react';

type WatchCallback<T> = (newValue: T, oldValue: T) => void;
type Source<T> = T | (() => T);

interface DebounceFilterOptions {
  debounce?: number;
  maxWait?: number;
}

interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

interface WatchDebouncedOptions extends WatchOptions, DebounceFilterOptions {}

export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (typeof obj1 !== typeof obj2) return false;
  if (!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export function getSourceValue<T>(source: Source<T>, deep: boolean): T {
  const value = typeof source === 'function' ? (source as () => T)() : source;
  return deep && isObject(value) ? (structuredClone(value) as T) : value;
}

function debounceFn<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: { maxWait?: number } = {}
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let maxTimeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let lastCallTime = 0;

  const invoke = (context: any, args: Parameters<T>) => {
    lastCallTime = Date.now();
    func.apply(context, args);
  };

  const debounced = function (this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;
    const now = Date.now();

    if (!lastCallTime) lastCallTime = now;

    const remainingWait = wait - (now - lastCallTime);

    const shouldInvoke = remainingWait <= 0;

    if (shouldInvoke) {
      if (timeout) clearTimeout(timeout);
      lastCallTime = now;
      if (lastArgs) invoke(lastThis, lastArgs);
    } else {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        if (lastArgs) invoke(lastThis, lastArgs);
      }, remainingWait);
    }

    if (options.maxWait !== undefined) {
      if (maxTimeout) clearTimeout(maxTimeout);
      maxTimeout = setTimeout(() => {
        if (timeout) clearTimeout(timeout);
        if (lastArgs) invoke(lastThis, lastArgs);
      }, options.maxWait);
    }
  };

  return debounced as T;
}

export function useDebouncedWatch<T>(
  source: Source<T>,
  callback: WatchCallback<T>,
  options?: WatchDebouncedOptions
) {
  const {
    deep = false,
    immediate = false,
    debounce = 0,
    maxWait,
  } = options || {};

  const previousValue = usePrevious(getSourceValue(source, deep));

  const initialRun = React.useRef(true);
  const debouncedCallback = React.useRef(
    debounceFn(
      (newValue: T, oldValue: T) => callback(newValue, oldValue),
      debounce,
      { maxWait }
    )
  );

  React.useEffect(() => {
    const newValue = getSourceValue(source, deep);

    if (initialRun.current) {
      if (immediate) {
        debouncedCallback.current(newValue, previousValue as T);
      }
      initialRun.current = false;
    } else if (
      deep ? !deepEqual(newValue, previousValue) : newValue !== previousValue
    ) {
      debouncedCallback.current(newValue, previousValue as T);
    }
  }, [source, deep, immediate, previousValue]);

  return () => {
    debouncedCallback.current = () => {};
  };
}
