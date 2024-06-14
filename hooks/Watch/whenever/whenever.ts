import * as React from 'react';
import type { WatchCallback, WheneverOptions } from '../watch';

/**
 * React utility that watches a value and triggers a callback whenever the value is truthy.
 *
 * @template T
 * @param {T | false | null | undefined} value - The value to watch. If falsy, the callback will not be triggered.
 * @param {WatchCallback<T>} callback - The function to call whenever the value is truthy.
 * @param {WheneverOptions} [options] - Additional options for the hook.
 */
export function whenever<T>(
  value: T | false | null | undefined,
  callback: WatchCallback<T>,
  options?: WheneverOptions
) {
  const { once = false } = options || {};
  const [previous, setPrevious] = React.useState<T | undefined>(undefined);
  const hasTriggeredRef = React.useRef(false);

  React.useEffect(() => {
    if (value) {
      if (!once || !hasTriggeredRef.current) {
        callback(value, previous);
        hasTriggeredRef.current = true;
      }
      setPrevious(value);
    }
  }, [value, callback, previous, once]);
}
