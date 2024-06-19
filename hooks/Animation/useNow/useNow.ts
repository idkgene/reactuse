import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Options for the `useNow` hook.
 *
 * @interface UseNowOptions
 * @property {boolean} [controls=false] - Enable controls to pause and resume the interval.
 * @property {'requestAnimationFrame' | number} [interval=1000] - The interval for the Date to update. Can be either a number in milliseconds or 'requestAnimationFrame'.
 */
interface UseNowOptions {
  controls?: boolean;
  interval?: 'requestAnimationFrame' | number;
}

/**
 * Return type of the useNow hook when controls are enabled.
 *
 * @interface UseNowReturnWithControls
 * @property {Date} now - The current Date.
 * @property {() => void} pause - Pause the interval.
 * @property {() => void} resume - Resume the interval.
 */
interface UseNowReturnWithControls {
  now: Date;
  pause: () => void;
  resume: () => void;
}

/**
 * Return type of the useNow hook based on the controls option.
 *
 * @template T - Whether controls are enabled.
 * @typedef {T extends true ? UseNowReturnWithControls : Date} UseNowReturn
 */
type UseNowReturn<T extends boolean> = T extends true
  ? UseNowReturnWithControls
  : Date;

/**
 * Custom hook that returns the current Date with optional controls.
 *
 * @template T - Whether controls are enabled.
 * @param {UseNowOptions & { controls?: T }} [options] - Options for the useNow hook.
 * @returns {UseNowReturn<T>} The current Date or an object with controls to pause and resume the interval.
 *
 * @example
 * // Basic usage
 * const now = useNow();
 *
 * // With controls enabled
 * const { now, pause, resume } = useNow({ controls: true });
 */
export function useNow<T extends boolean = false>(
  options?: UseNowOptions & { controls?: T }
): UseNowReturn<T> {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(true);

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
    clearTimers();
  }, [clearTimers]);

  const resume = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const update = () => setNow(new Date());

    if (options?.interval === 'requestAnimationFrame') {
      const loop = () => {
        update();
        animationFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
    } else {
      update();
      intervalRef.current = window.setInterval(
        update,
        options?.interval ?? 1000
      );
    }

    return () => clearTimers();
  }, [isActive, options?.interval, clearTimers]);

  if (options?.controls) {
    return {
      now,
      pause,
      resume,
    } as UseNowReturn<T>;
  }

  return now as UseNowReturn<T>;
}
