import { useState, useEffect } from 'react';

type MaybeGetter<T> = T | (() => T);

function resolveMaybeGetter<T>(value: MaybeGetter<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function useAbs(value: MaybeGetter<number>): number {
  const [absValue, setAbsValue] = useState(() =>
    Math.abs(resolveMaybeGetter(value))
  );

  useEffect(() => {
    const resolvedValue = resolveMaybeGetter(value);
    setAbsValue(Math.abs(resolvedValue));
  }, [resolveMaybeGetter(value)]);

  return absValue;
}
