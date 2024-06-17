import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimestampOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls;
  /**
   * Offset value adding to the value
   *
   * @default 0
   */
  offset?: number;
  /**
   * Update the timestamp immediately
   *
   * @default true
   */
  immediate?: boolean;
  /**
   * Update interval, or use requestAnimationFrame
   *
   * @default 'requestAnimationFrame'
   */
  interval?: 'requestAnimationFrame' | number;
  /**
   * Callback on each update
   */
  callback?: (timestamp: number) => void;
}

interface Pausable {
  pause: () => void;
  resume: () => void;
}

type UseTimestampReturn<Controls extends boolean> = Controls extends true
  ? { timestamp: number } & Pausable
  : number;

/**
 * Reactive current timestamp.
 *
 * @param options - Options for the useTimestamp hook
 * @returns The current timestamp or an object with the timestamp and controls based on the options
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
