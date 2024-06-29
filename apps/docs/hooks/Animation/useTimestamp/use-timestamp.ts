import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimestampOptions<Controls extends boolean> {
  controls?: Controls;
  offset?: number;
  immediate?: boolean;
  interval?: 'requestAnimationFrame' | number;
  callback?: (timestamp: number) => void;
}

interface Pausable {
  pause: () => void;
  resume: () => void;
}

type UseTimestampReturn<Controls extends boolean> = Controls extends true
  ? { timestamp: number } & Pausable
  : number;

export function useTimestamp<Controls extends boolean = false>(
  options?: UseTimestampOptions<Controls>,
): UseTimestampReturn<Controls> {
  const {
    controls = false,
    offset = 0,
    immediate = true,
    interval = 'requestAnaimationFrame',
    callback,
  } = options ?? {};

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
    [offset, callback],
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

  useEffect(() => {
    if (!isActive) return;

    const tick = (): void => {
      updateTimestamp(Date.now());
    };

    if (interval === 'requestAnimationFrame') {
      const animate = (): void => {
        tick();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (typeof interval !== 'number' || interval <= 0) {
        throw new Error(
          'Invalid interval value. Interval must be a positive number.',
        );
      }
      intervalRef.current = window.setInterval(tick, interval);
    }

    return () => {
      pause();
    };
  }, [isActive, interval, updateTimestamp, pause]);

  useEffect(() => {
    if (immediate) {
      updateTimestamp(Date.now());
    }
  }, [immediate, updateTimestamp]);

  if (controls) {
    return {
      timestamp,
      pause,
      resume,
    } as UseTimestampReturn<Controls>;
  }

  return timestamp as UseTimestampReturn<Controls>;
}
