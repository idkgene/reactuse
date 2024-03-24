/**
 * A React hook that detects user inactivity and sets an idle state after a specified amount of time.
 *
 * @module useIdle
 * @param {number} [ms=60000] - The amount of time in milliseconds after which the user is considered idle.
 * @returns {boolean} A boolean indicating whether the user is currently idle.
 *
 * @description
 * The `useIdle` hook monitors various user events such as mouse movements, mouse clicks, keyboard input, window resizing,
 * touch events, and scroll events. If no user activity is detected within the specified time (default is 1 minute),
 * the hook sets an idle state to true. The idle state is reset to false whenever user activity is detected.
 *
 * The hook also takes into account the browser's visibility state. If the browser tab or window becomes visible again,
 * the idle state is reset to false.
 *
 * The hook uses a throttling utility function to prevent excessive event handling and improve performance.
 *
 * @example
 * import { useIdle } from './useIdle';
 *
 * function MyComponent() {
 *   const isIdle = useIdle(1000 * 60 * 5); // User is considered idle after 5 minutes
 *
 *   return (
 *     <div>
 *       {isIdle ? 'User is idle' : 'User is active'}
 *     </div>
 *   );
 * }
 */

import { useEffect, useState } from 'react';
import { throttle } from '../utils/utils';

export function useIdle(ms = 1000 * 60) {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let timeoutId: number

    const handleTimeout = () => {
      setIdle(true)
    }

    const handleEvent = throttle(() => {
      setIdle(false)

      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(handleTimeout, ms)
    }, 500)

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleEvent()
      }
    }

    timeoutId = window.setTimeout(handleTimeout, ms)

    window.addEventListener('mousemove', handleEvent)
    window.addEventListener('mousedown', handleEvent)
    window.addEventListener('resize', handleEvent)
    window.addEventListener('keydown', handleEvent)
    window.addEventListener('touchstart', handleEvent)
    window.addEventListener('wheel', handleEvent)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('mousemove', handleEvent)
      window.removeEventListener('mousedown', handleEvent)
      window.removeEventListener('resize', handleEvent)
      window.removeEventListener('keydown', handleEvent)
      window.removeEventListener('touchstart', handleEvent)
      window.removeEventListener('wheel', handleEvent)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.clearTimeout(timeoutId)
    }
  }, [ms])

  return idle
}
