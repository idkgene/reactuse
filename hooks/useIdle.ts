/**
 * @module useIdle
 * @param {number} [ms=60000] - The amount of time in milliseconds after which the user is considered idle.
 * @returns {boolean} A boolean indicating whether the user is currently idle.
 */

import { throttle } from '@/utils/utils';
import { useEffect, useState } from 'react';

export const setIdle = (ms = 1000 * 60) => {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let timeoutId: number | null = null

    const handleTimeout = () => {
      setIdle(true)
    }

    const handleEvent = throttle(() => {
      setIdle(false)

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }

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

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [ms])

  return idle
}