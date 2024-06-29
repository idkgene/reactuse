import * as React from 'react';
import type { Resolvable } from '../math';

function resolveResolvable<T>(Resolvable: Resolvable<T>): T {
  return typeof Resolvable === 'function'
    ? (Resolvable as () => T)()
    : Resolvable;
}

export function useAbs(value: number | (() => number)): number {
  const [absValue, setAbsValue] = React.useState(() =>
    Math.abs(resolveResolvable(value)),
  );

  React.useEffect(() => {
    setAbsValue(Math.abs(resolveResolvable(value)));
  }, [resolveResolvable(value)]);

  return absValue;
}
