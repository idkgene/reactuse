import React, { useRef, useEffect } from 'react'

interface UseLastChangedOptions<T> {
  initialValue?: number | null;
  equalityFn?: (prev: T, next: T) => boolean;
}

export function useLastChanged<T>(
  source: T,
  options: UseLastChangedOptions<T> = {}
): React.MutableRefObject<number | null> {
  const { initialValue = null, equalityFn } = options;
  const lastChanged = useRef<number | null>(initialValue);
  const prevSource = useRef<T>(source);

  useEffect(() => {
    const isEqual = equalityFn
      ? equalityFn(prevSource.current, source)
      : prevSource.current === source;

    if (!isEqual) {
      lastChanged.current = Date.now();
      prevSource.current = source;
    }
  }, [source, equalityFn]);

  return lastChanged;
}
