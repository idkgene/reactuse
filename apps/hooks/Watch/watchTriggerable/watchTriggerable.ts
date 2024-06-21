import * as React from 'react';

type WatchCallback<T> = (
  newValue: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void;
type Source<T> = T | (() => T);

interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

interface WatchTriggerableReturn {
  trigger: () => void;
  ignoreUpdates: (updater: () => void) => void;
  stop: () => void;
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

export function useTriggerableWatch<T>(
  source: Source<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): WatchTriggerableReturn {
  const { deep = false, immediate = false } = options || {};
  const previousValue = usePrevious(getSourceValue(source, deep));
  const initialRun = React.useRef(true);
  const ignoreUpdateRef = React.useRef(false);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  const onCleanup = (cleanupFn: () => void) => {
    cleanupRef.current = cleanupFn;
  };

  const wrappedCallback = (newValue: T, oldValue: T) => {
    if (!ignoreUpdateRef.current) {
      cleanupRef.current?.();
      callback(newValue, oldValue, onCleanup);
    }
  };

  const trigger = () => {
    const newValue = getSourceValue(source, deep);
    wrappedCallback(newValue, previousValue as T);
  };

  const ignoreUpdates = (updater: () => void) => {
    ignoreUpdateRef.current = true;
    updater();
    ignoreUpdateRef.current = false;
  };

  React.useEffect(() => {
    const newValue = getSourceValue(source, deep);

    if (initialRun.current) {
      if (immediate) {
        wrappedCallback(newValue, previousValue as T);
      }
      initialRun.current = false;
    } else if (
      deep ? !deepEqual(newValue, previousValue) : newValue !== previousValue
    ) {
      wrappedCallback(newValue, previousValue as T);
    }
  }, [source, deep, immediate, previousValue]);

  return {
    trigger,
    ignoreUpdates,
    stop: () => ((wrappedCallback as any) = () => {}),
  };
}
