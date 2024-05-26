import { useCallback, useEffect, useRef } from "react";

interface LongPressOptions {
  duration?: number;
}

/**
 * A custom React hook that handles long press events.
 * @param callback
 * @param options
 * @returns {onMouseDown: () => void, onMouseUp: () => void, onTouchStart: () => void, onTouchEnd: () => void} 
 */
export const useLongPress = (
  callback: () => void,
  options: LongPressOptions = {}
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
    isLongPressRef.current = false;
    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      callback();
    }, duration);
  }, [callback, duration]);

  const cancelPressTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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