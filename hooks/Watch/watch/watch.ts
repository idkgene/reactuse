import * as React from 'react';

export type WatchCallback<T> = (newValue: T, oldValue: T) => void;
export type Source<T> = T | (() => T);

export interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

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
  return deep && isObject(value) ? JSON.parse(JSON.stringify(value)) : value;
}

export function watch<T>(
  source: Source<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): void {
  const { deep = false, immediate = false } = options || {};
  const previousValue = usePrevious(getSourceValue(source, deep));
  const initialRun = React.useRef(true);

  React.useEffect(() => {
    const newValue = getSourceValue(source, deep);

    if (initialRun.current) {
      if (immediate) {
        callback(newValue, previousValue as T);
      }
      initialRun.current = false;
    } else if (
      (deep && !deepEqual(newValue, previousValue)) ||
      (!deep && newValue !== previousValue)
    ) {
      callback(newValue, previousValue as T);
    }
  }, [source, deep, immediate, callback, previousValue]);
}
