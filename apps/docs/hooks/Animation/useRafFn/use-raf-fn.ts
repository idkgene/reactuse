import { useCallback, useEffect, useRef } from 'react';

interface UseRafFnCallbackArguments {
  delta: number;
  timestamp: DOMHighResTimeStamp;
}

interface UseRafFnOptions {
  immediate?: boolean;
  fpsLimit?: number;
}

interface Pausable {
  pause: () => void;
  resume: () => void;
  isActive: () => boolean;
}

function useRafFn(
  fn: (args: UseRafFnCallbackArguments) => void,
  options: UseRafFnOptions = {},
): Pausable {
  const { immediate = true, fpsLimit } = options;

  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const fnRef = useRef(fn);
  const activeRef = useRef(immediate);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const loop = useCallback(
    (timestamp: number) => {
      if (!activeRef.current) return;

      const delta = timestamp - lastTimeRef.current;

      if (!fpsLimit || delta >= 1000 / fpsLimit) {
        fnRef.current({ delta, timestamp });
        lastTimeRef.current = timestamp;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    },
    [fpsLimit],
  );

  const resume = useCallback(() => {
    if (!activeRef.current) {
      activeRef.current = true;
      rafIdRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  const pause = useCallback(() => {
    activeRef.current = false;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      resume();
    }

    return () => {
      pause();
    };
  }, [immediate, pause, resume]);

  const isActive = useCallback(() => activeRef.current, []);

  return { pause, resume, isActive };
}

export default useRafFn;
