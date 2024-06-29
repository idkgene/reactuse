import { useCallback, useEffect, useRef } from 'react';

interface LongPressOptions {
  duration?: number;
}

export const useLongPress = (
  callback: () => void,
  options: LongPressOptions = {},
): {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
} => {
  const { duration = 500 } = options;
  const timerRef = useRef<number | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const startPressTimer = useCallback(() => {
    // Resets the long press
    isLongPressRef.current = false;
    // Start a timer to determine if this is a long press
    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      callback();
    }, duration);
  }, [callback, duration]);

  const cancelPressTimer = useCallback(() => {
    // Cancel the timer if it is set
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Ensure that we clean up any remaining timers when the component unmounts
  useEffect(() => {
    return () => {
      cancelPressTimer();
    };
  }, [cancelPressTimer]);

  return {
    onMouseDown: startPressTimer,
    onMouseUp: cancelPressTimer,
    onTouchStart: startPressTimer,
    onTouchEnd: cancelPressTimer,
  };
};
