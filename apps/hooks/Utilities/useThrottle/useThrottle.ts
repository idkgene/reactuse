import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay: number = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const lastValue = useRef<T>(value);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    const elapsed = Date.now() - lastExecuted.current;

    if (elapsed >= delay) {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    } else {
      lastValue.current = value;
      timerId.current = setTimeout(() => {
        setThrottledValue(lastValue.current);
        lastExecuted.current = Date.now();
      }, delay - elapsed);
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}
