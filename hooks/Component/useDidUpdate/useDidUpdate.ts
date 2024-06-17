import { useEffect, useRef } from 'react';

import type { DependencyList, EffectCallback } from 'react';

/**
 * React hook that triggers an effect only on component updates, not on initial mount
 *
 * @param {EffectCallback} effect - The effect function to execute on updates.
 * @param {DependencyList} deps - Optional array of dependencies for the effect.
 *
 * @example
 * useDidUpdate(() => {
 *    console.log('Component updated!');;
 * });
 */
export function useDidUpdate(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }
    didMountRef.current = true;
  }, [deps, effect]);
}
