import { useCallback, useEffect, useRef } from 'react';

/**
 * Arguments passed to the callback function in useRafFn.
 * @param delta - The time elapsed since the last frame in milliseconds.
 * @param timestamp - The current timestamp.
 */
interface UseRafFnCallbackArguments {
  delta: number;
  timestamp: DOMHighResTimeStamp;
}

/**
 * Options for configuring useRafFn.
 * @param immediate - Whether to start the animation immediately.
 * @param fpsLimit - The maximum number of frames per second.
 */
interface UseRafFnOptions {
  immediate?: boolean;
  fpsLimit?: number;
}

/**
 * Interface for controlling the animation frame loop.
 * @param pause - Function to pause the animation.
 * @param resume - Function to resume the animation.
 * @param isActive - Function to check if the animation is active.
 */
interface Pausable {
  pause: () => void;
  resume: () => void;
  isActive: () => boolean;
}

/**
 * A custom React hook that runs a callback using requestAnimationFrame with optional FPS limiting.
 *
 * @param fn - The callback function to be executed on each animation frame.
 * @param options - Configuration options for the animation loop.
 * @returns An object with methods to control the animation loop.
 *
 * @throws Error If the first argument is not a function or if fpsLimit is invalid.
 *
 * @example
 * ```tsx
 * const { pause, resume, isActive } = useRafFn(
 *   ({ delta }) => {
 *     console.log(`Time since last frame: ${delta}ms`);
 *   },
 *   { fpsLimit: 30 }
 * );
 * ```
 */
function useRafFn(
  fn: (args: UseRafFnCallbackArguments) => void,
  options: UseRafFnOptions = {},
): Pausable {
  if (typeof fn !== 'function') {
    throw new Error('First argument must be a function');
  }

  const { immediate = true, fpsLimit } = options;

  if (
    fpsLimit !== undefined &&
    (typeof fpsLimit !== 'number' || fpsLimit <= 0)
  ) {
    throw new Error('fpsLimit must be a positive number');
  }

  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const fnRef = useRef<(args: UseRafFnCallbackArguments) => void>(fn);
  const activeRef = useRef<boolean>(immediate);

  fnRef.current = fn;

  const loop = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
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
    return pause;
  }, [immediate, pause, resume]);

  const isActive = useCallback(() => activeRef.current, []);

  return { pause, resume, isActive };
}

export { useRafFn };
export type { UseRafFnOptions };
