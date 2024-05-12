
import { useEffect, useRef, useState } from "react";

interface UseDebounceOptions<T> {
  initialValue?: T;
  shouldDebounce?: (prev: T, next: T) => boolean;
}

export function useDebounce<T>(
  value: T,
  delay: number = 500,
  options: UseDebounceOptions<T> = {}
): T {
  const { initialValue = value, shouldDebounce } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const prevValue = useRef<T>(value);

  useEffect(() => {
    const shouldTriggerDebounce = shouldDebounce
      ? shouldDebounce(prevValue.current, value)
      : prevValue.current !== value;

    if (shouldTriggerDebounce) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }

    prevValue.current = value;
  }, [value, delay, shouldDebounce]);

  return debouncedValue;
}