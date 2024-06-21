import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Options for the useTimestamp hook.
 *
 * @interface UseTimestampOptions
 * @template Controls - Whether controls are enabled.
 * @property {Controls} [controls=false] - Expose more controls.
 * @property {number} [offset=0] - Offset value added to the timestamp.
 * @property {boolean} [immediate=true] - Update the timestamp immediately.
 * @property {'requestAnimationFrame' | number} [interval='requestAnimationFrame'] - Update interval, or use requestAnimationFrame.
 * @property {(timestamp: number) => void} [callback] - Callback function invoked on each update.
 */
interface UseTimestampOptions<Controls extends boolean> {
  controls?: Controls;
  offset?: number;
  immediate?: boolean;
  interval?: 'requestAnimationFrame' | number;
  callback?: (timestamp: number) => void;
}

/**
 * Interface for pause and resume controls.
 *
 * @interface Pausable
 * @property {() => void} pause - Pause the timestamp updates.
 * @property {() => void} resume - Resume the timestamp updates.
 */
interface Pausable {
  pause: () => void;
  resume: () => void;
}

/**
 * Return type of the useTimestamp hook based on the controls option.
 *
 * @template Controls - Whether controls are enabled.
 * @typedef {Controls extends true ? { timestamp: number } & Pausable : number} UseTimestampReturn
 */
type UseTimestampReturn<Controls extends boolean> = Controls extends true
  ? { timestamp: number } & Pausable
  : number;

/**
 * Current timestamp.
 *
 * @template Controls - Whether controls are enabled.
 * @param {UseTimestampOptions<Controls>} [options] - Options for the useTimestamp hook.
 * @returns {UseTimestampReturn<Controls>} The current timestamp or an object with the timestamp and controls based on the options.
 *
 * @example
 * // Basic usage
 * const timestamp = useTimestamp();
 *
 * // With controls
 * const { timestamp, pause, resume } = useTimestamp({ controls: true });
 */
export function useTimestamp<Controls extends boolean = false>(
  options?: UseTimestampOptions<Controls>
): UseTimestampReturn<Controls> {
  const {
    controls = false,
    offset = 0,
    immediate = true,
    interval = 'requestAnimationFrame',
    callback,
  } = options || {};

  const [timestamp, setTimestamp] = useState(() => Date.now() + offset);
  const intervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(immediate);

  const updateTimestamp = useCallback(
    (newTimestamp: number) => {
      const updatedTimestamp = newTimestamp + offset;
      setTimestamp(updatedTimestamp);
      callback?.(updatedTimestamp);
    },
    [offset, callback]
  );

  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
  }, []);

  const tick = useCallback(() => {
    updateTimestamp(Date.now());
  }, [updateTimestamp]);

  useEffect(() => {
    if (!isActive) return;

    if (interval === 'requestAnimationFrame') {
      const animate = () => {
        tick();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      intervalRef.current = window.setInterval(tick, interval);
    }

    return pause;
  }, [isActive, interval, tick, pause]);

  useEffect(() => {
    if (immediate) {
      tick();
    }
  }, [immediate, tick]);

  if (controls) {
    return {
      timestamp,
      pause,
      resume,
    } as UseTimestampReturn<Controls>;
  }

  return timestamp as UseTimestampReturn<Controls>;
}
