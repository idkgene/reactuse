import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay = 200): T {
  if (delay < 0) {
    throw new Error('Delay must be a non-negative number');
  }

  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const lastValue = useRef<T>(value);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const executeThrottle = (): void => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
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
          timerId.current = null;
        }, delay - elapsed);
      }
    };

    try {
      executeThrottle();
    } catch (error) {
      console.error('Error in useThrottle:', error);
      throw new Error('An error occurred in useThrottle');
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}
