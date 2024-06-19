import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Callback function type.
 *
 * @typedef {() => void} CallbackFn
 */
type CallbackFn = () => void;

/**
 * Options for the useTimeout hook.
 *
 * @interface UseTimeoutFnOptions
 * @property {boolean} [immediate=true] - Start the timer immediately after calling this function.
 */
interface UseTimeoutFnOptions {
  immediate?: boolean;
}

/**
 * Options for the useTimeout hook with controls.
 *
 * @interface UseTimeoutOptions
 * @extends UseTimeoutFnOptions
 * @property {boolean} [controls=false] - Expose more controls.
 * @property {CallbackFn} [callback] - Callback function to be invoked on timeout.
 */
interface UseTimeoutOptions<Controls extends boolean>
  extends UseTimeoutFnOptions {
  controls?: Controls;
  callback?: CallbackFn;
}

/**
 * Interface for start and stop controls.
 *
 * @interface Stoppable
 * @property {() => void} start - Start the timeout.
 * @property {() => void} stop - Stop the timeout.
 */
interface Stoppable {
  start: () => void;
  stop: () => void;
}

/**
 * Return type of the useTimeout hook based on the controls option.
 *
 * @template Controls - Whether controls are enabled.
 * @typedef {Controls extends true ? { ready: boolean } & Stoppable : boolean} UseTimeoutReturn
 */
type UseTimeoutReturn<Controls extends boolean> = Controls extends true
  ? { ready: boolean } & Stoppable
  : boolean;

/**
 * Update value after a given time with controls.
 *
 * @template Controls - Whether controls are enabled.
 * @param {number | (() => number)} interval - The timeout interval in milliseconds or a function that returns the interval.
 * @param {UseTimeoutOptions<Controls>} [options] - Options for the useTimeout hook.
 * @returns {UseTimeoutReturn<Controls>} A boolean indicating if the timeout is ready, or an object with ready state and controls based on the options.
 *
 * @example
 * // Basic usage
 * const ready = useTimeout(1000);
 *
 * // With controls
 * const { ready, start, stop } = useTimeout(1000, { controls: true });
 */
export function useTimeout<Controls extends boolean = false>(
  interval: number | (() => number),
  options?: UseTimeoutOptions<Controls>
): UseTimeoutReturn<Controls> {
  const { immediate = true, controls = false, callback } = options || {};
  const [ready, setReady] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setReady(false);
  }, []);

  const start = useCallback(() => {
    setReady(false);
    stop();
    const delay = typeof interval === 'function' ? interval() : interval;
    timeoutRef.current = window.setTimeout(() => {
      setReady(true);
      callback?.();
    }, delay);
  }, [interval, stop, callback]);

  useEffect(() => {
    if (immediate) {
      start();
    }

    return () => {
      stop();
    };
  }, [immediate, start, stop]);

  const controlFunctions = useCallback(
    () => ({
      start: () => {
        stop();
        start();
      },
      stop,
    }),
    [start, stop]
  );

  if (controls) {
    return {
      ready,
      ...controlFunctions(),
    } as UseTimeoutReturn<Controls>;
  }

  return ready as UseTimeoutReturn<Controls>;
}
