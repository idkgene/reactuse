import { useEffect, useState } from 'react';

export interface UseVibrateParams {
  pattern: number | number[];
  enabled?: boolean;
  loop?: boolean;
}

export interface UseVibrateOptions {
  enabled?: boolean;
  loop?: boolean;
}

export interface UseVibrateReturn {
  isSupported: boolean;
  isVibrating: boolean;
  vibrate: (pattern?: number | number[]) => void;
  stop: () => void;
}

export interface UseVibrate {
  (pattern: number | number[], options?: UseVibrateOptions): UseVibrateReturn;
  (
    { pattern, loop, enabled }: UseVibrateParams,
    options?: never,
  ): UseVibrateReturn;
}

let interval: NodeJS.Timeout;

export const useVibrate: UseVibrate = (...params) => {
  const pattern =
    typeof params[0] === 'number' || Array.isArray(params[0])
      ? params[0]
      : params[0].pattern;
  const { loop, enabled } =
    typeof params[0] === 'number' || Array.isArray(params[0])
      ? params[1] ?? {}
      : params[0] ?? {};

  const [isSupported, setIsSupported] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

  useEffect(() => {
    if (navigator && 'vibrate' in navigator) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const vibrate = (curPattern = pattern) => {
    if (!isSupported || isVibrating) return;

    const duration =
      curPattern instanceof Array
        ? curPattern.reduce((a, b) => a + b)
        : curPattern;

    setIsVibrating(true);
    navigator.vibrate(curPattern);

    if (loop) {
      interval = setInterval(() => {
        navigator.vibrate(curPattern);
      }, duration);
    } else {
      setTimeout(() => {
        setIsVibrating(false);
      }, duration);
    }
  };

  const stop = () => {
    if (!isSupported) return;

    setIsVibrating(false);
    navigator.vibrate(0);

    if (loop) {
      clearInterval(interval);
    }
  };

  useEffect(() => {
    if (!isSupported || isVibrating) return;

    if (enabled) {
      vibrate();
    }

    return () => {
      if (enabled) {
        setIsVibrating(false);
        navigator.vibrate(0);

        if (loop) {
          clearInterval(interval);
        }
      }
    };
  }, [enabled]);

  return { isSupported, vibrate, stop, isVibrating } as const;
};
