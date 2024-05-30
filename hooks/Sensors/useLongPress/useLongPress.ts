import { useCallback, useEffect, useRef } from 'react'

interface LongPressOptions {
  duration?: number
}

/**
 * @name useLongPrees
 * @description  This hook provides handlers that start or cancel a timer when the user presses or releases a mouse or touch.
 * If the press lasts for a specified duration (or 500ms by default), the provided callback is called, indicating
 * a long press event. The duration can be adjusted via the options parameter.
 *
 * @param {() => void} callback - The function to call when a long press is detected.
 * @param {LongPressOptions} [options={}] - Configuration options for the long press action.
 * @returns {{ onMouseDown: () => void, onMouseUp: () => void, onTouchStart: () => void, onTouchEnd: () => void }}
 * Handlers for mouse and touch events:
 * - `onMouseDown`: Starts the timer on mouse down.
 * - `onMouseUp`: Cancels the timer on mouse up.
 * - `onTouchStart`: Starts the timer on touch start.
 * - `onTouchEnd`: Cancels the timer on touch end.
 *
 * @example
 * import { useLongPress } from './useLongPress';
 *
 * function Demo() {
 *   const longPressHandlers = useLongPress(() => {
 *     console.log('Long pressed!');
 *   }, { duration: 1000 });
 *
 *   return (
 *     <div
 *       {...longPressHandlers}
 *       style={{ width: '100px', height: '100px', backgroundColor: 'skyblue', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
 *     >
 *       Press and hold me
 *     </div>
 *   );
 * }
 */
export const useLongPress = (
  callback: () => void,
  options: LongPressOptions = {}
): {
  onMouseDown: () => void
  onMouseUp: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
} => {
  const { duration = 500 } = options
  const timerRef = useRef<number | null>(null)
  const isLongPressRef = useRef<boolean>(false)

  const startPressTimer = useCallback(() => {
    // Resets the long press
    isLongPressRef.current = false
    // Start a timer to determine if this is a long press
    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true
      callback()
    }, duration)
  }, [callback, duration])

  const cancelPressTimer = useCallback(() => {
    // Cancel the timer if it is set
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Ensure that we clean up any remaining timers when the component unmounts
  useEffect(() => {
    return () => {
      cancelPressTimer()
    }
  }, [cancelPressTimer])

  return {
    onMouseDown: startPressTimer,
    onMouseUp: cancelPressTimer,
    onTouchStart: startPressTimer,
    onTouchEnd: cancelPressTimer,
  }
}
