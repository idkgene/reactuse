import { useCallback, useEffect, useRef, useState } from 'react';

interface UseNowOptions {
  controls?: boolean;
  interval?: 'requestAnimationFrame' | number;
}

interface UseNowReturnWithControls {
  now: Date;
  pause: () => void;
  resume: () => void;
}

type UseNowReturn<T extends boolean> = T extends true
  ? UseNowReturnWithControls
  : Date;

function useNow<T extends boolean = false>(
  options?: UseNowOptions & { controls?: T },
): UseNowReturn<T> {
  const [now, setNow] = useState(() => new Date());
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

    const update = (): void => {
      setNow(new Date());
    };

    if (options?.interval === 'requestAnimationFrame') {
      const loop = (): void => {
        update();
        animationFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
    } else {
      update();
      const intervalValue = options?.interval ?? 1000;
      if (typeof intervalValue !== 'number' || intervalValue <= 0) {
        throw new Error('useNow: interval must be a positive number');
      }
      intervalRef.current = window.setInterval(update, intervalValue);
    }

    return clearTimers;
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

export { useNow };
export type { UseNowOptions, UseNowReturnWithControls, UseNowReturn };