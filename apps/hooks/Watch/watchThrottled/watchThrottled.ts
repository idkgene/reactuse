import * as React from 'react';

type WatchCallback<T> = (newValue: T, oldValue: T) => void;
type Source<T> = T | (() => T);

interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

interface WatchThrottledOptions extends WatchOptions {
  throttle?: number;
  trailing?: boolean;
  leading?: boolean;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function deepEqual<T>(obj1: T, obj2: T): boolean {
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

function getSourceValue<T>(source: Source<T>, deep: boolean): T {
  const value = typeof source === 'function' ? (source as () => T)() : source;
  return deep && isObject(value) ? (structuredClone(value) as T) : value;
}

function throttleFn<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let lastCallTime = 0;
  let lastInvokeTime = 0;

  const invoke = (context: any, args: Parameters<T>) => {
    lastInvokeTime = Date.now();
    func.apply(context, args);
  };

  const leadingInvoke = (context: any, args: Parameters<T>) => {
    lastInvokeTime = Date.now();
    func.apply(context, args);
  };

  const trailingInvoke = () => {
    if (lastArgs) {
      invoke(lastThis, lastArgs);
      lastArgs = null;
    }
  };

  const throttled = function (this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    const timeSinceLastInvoke = now - lastInvokeTime;

    lastCallTime = now;

    const shouldInvokeLeading = options.leading && timeSinceLastInvoke >= wait;
    const shouldInvokeTrailing =
      options.trailing && timeSinceLastInvoke >= wait;

    if (shouldInvokeLeading && !timeout) {
      leadingInvoke(lastThis, lastArgs);
    }

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        if (shouldInvokeTrailing) trailingInvoke();
      }, wait);
    }
  };

  return throttled as T;
}

export function useThrottledWatch<T>(
  source: Source<T>,
  callback: WatchCallback<T>,
  options?: WatchThrottledOptions
): () => void {
  const {
    deep = false,
    immediate = false,
    throttle = 500,
    trailing = true,
    leading = true,
  } = options || {};
  const previousValue = usePrevious(getSourceValue(source, deep));
  const initialRun = React.useRef(true);
  const throttledCallback = React.useRef(
    throttleFn(
      (newValue: T, oldValue: T) => callback(newValue, oldValue),
      throttle,
      { trailing, leading }
    )
  );

  React.useEffect(() => {
    const newValue = getSourceValue(source, deep);

    if (initialRun.current) {
      if (immediate) {
        throttledCallback.current(newValue, previousValue as T);
      }
      initialRun.current = false;
    } else if (
      deep ? !deepEqual(newValue, previousValue) : newValue !== previousValue
    ) {
      throttledCallback.current(newValue, previousValue as T);
    }
  }, [source, deep, immediate, previousValue]);

  return () => {
    throttledCallback.current = () => {};
  };
}
