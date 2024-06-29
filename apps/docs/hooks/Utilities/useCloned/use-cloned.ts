import { useRef, useEffect, useCallback } from 'react';
import { type UseClonedOptions, type UseClonedReturn } from '../utilities';

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

export function useCloned<T>(
  source: T,
  options?: UseClonedOptions<T>,
): UseClonedReturn<T> {
  const cloned = useRef<T>(
    options?.clone ? options.clone(source) : cloneFnJSON(source),
  );
  const { manual = false, clone = cloneFnJSON } = options ?? {};

  const sync = useCallback(() => {
    cloned.current = clone(source);
  }, [source, clone]);

  useEffect(() => {
    if (!manual) {
      sync();
    }
  }, [source, manual, sync]);

  return { cloned, sync };
}
