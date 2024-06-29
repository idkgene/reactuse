import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

export function useDidUpdate(
  effect: EffectCallback,
  deps?: DependencyList,
): void {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }
    didMountRef.current = true;
  }, [deps, effect]);
}
