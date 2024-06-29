import { useState, useEffect } from 'react';
import type { DebounceOptions } from '../utilities';

export function useDebounce<T>(value: T, options: DebounceOptions = {}): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const clearTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    if (options.wait !== undefined && options.wait > 0) {
      if (options.leading && !timeoutId) {
        setDebouncedValue(value);
      }

      clearTimer();
      timeoutId = setTimeout(() => {
        if (options.trailing !== false) {
          setDebouncedValue(value);
        }
        timeoutId = null;
      }, options.wait);
    } else {
      setDebouncedValue(value);
    }

    return () => { clearTimer(); };
  }, [value, options.wait, options.leading, options.trailing]);

  return debouncedValue;
}
