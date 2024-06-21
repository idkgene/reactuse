import { useEffect } from 'react';

type WatchSource<T> = T | (() => T);

type WatchCallback<T> = (
  value: T,
  oldValue: T | undefined,
  onCleanup: (cleanupFn: () => void) => void
) => void;

interface WatchOptions {
  immediate?: boolean;
  deep?: boolean;
}

function useWatch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): void {
  const { immediate = false, deep = false } = options || {};

  useEffect(() => {
    const getSourceValue = () =>
      typeof source === 'function' ? (source as () => T)() : source;

    let oldValue: T | undefined;
    let cleanupFn: (() => void) | null = null;

    const onCleanup = (fn: () => void) => {
      cleanupFn = fn;
    };

    const checkAndTriggerCallback = () => {
      const newValue = getSourceValue();

      if (deep ? !isEqual(newValue, oldValue) : newValue !== oldValue) {
        if (cleanupFn) {
          cleanupFn();
          cleanupFn = null;
        }

        callback(newValue, oldValue, onCleanup);
        oldValue = newValue;
      }
    };

    if (immediate) {
      checkAndTriggerCallback();
    }

    const intervalId = setInterval(checkAndTriggerCallback, 0);

    return () => {
      clearInterval(intervalId);
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [source, callback]);
}

function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => isEqual(a[k], b[k]));
}

export default useWatch;
