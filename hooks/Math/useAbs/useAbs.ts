import { useState, useEffect } from 'react';

type ValueOrGetter<T> = T | (() => T);

function resolveValueOrGetter<T>(valueOrGetter: ValueOrGetter<T>): T {
  return typeof valueOrGetter === 'function'
    ? (valueOrGetter as () => T)()
    : valueOrGetter;
}

export function useAbs(value: number | (() => number)): number {
  const [absValue, setAbsValue] = useState(() =>
    Math.abs(resolveValueOrGetter(value))
  );

  useEffect(() => {
    setAbsValue(Math.abs(resolveValueOrGetter(value)));
  }, [value]);

  return absValue;
}
