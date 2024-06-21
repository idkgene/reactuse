import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseRafFnCallbackArguments {
  delta: number;
  timestamp: DOMHighResTimeStamp;
}

export interface UseRafFnOptions {
  immediate?: boolean;
  fpsLimit?: number;
}

export interface Pausable {
  pause: () => void;
  resume: () => void;
}

export function useRafFn(
  fn: (args: UseRafFnCallbackArguments) => void,
  options: UseRafFnOptions = {},
): Pausable {
  const { immediate = true, fpsLimit } = options;
  const [isActive, setIsActive] = useState(immediate);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const loop = useCallback(
    (time: DOMHighResTimeStamp) => {
      if (!isActive) return;

      const delta = lastTimeRef.current ? time - lastTimeRef.current : 0;

      if (!fpsLimit || delta >= 1000 / fpsLimit) {
        fnRef.current({ delta, timestamp: time });
        lastTimeRef.current = time;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    },
    [isActive, fpsLimit],
  );

  const pause = useCallback(() => {
    setIsActive(false);
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      lastTimeRef.current = 0;
      rafIdRef.current = requestAnimationFrame(loop);
    }
  }, [isActive, loop]);

  useEffect(() => {
    if (isActive) {
      rafIdRef.current = requestAnimationFrame(loop);
    }
    return pause;
  }, [isActive, loop, pause]);

  return { pause, resume };
}
