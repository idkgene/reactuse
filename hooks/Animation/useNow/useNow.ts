import { useEffect, useRef, useState } from 'react'

interface UseNowOptions {
  controls?: boolean
  interval?: 'requestAnimationFrame' | number
}

interface UseNowReturnType {
  now: Date
  pause: () => void
  resume: () => void
}

export function useNow(options: UseNowOptions = {}): UseNowReturnType {
  const { controls = false, interval = 'requestAnimationFrame' } = options

  const [now, setNow] = useState(new Date())
  const animationFrameRef = useRef<number | null>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const update = () => {
      if (!pausedRef.current) {
        setNow(new Date())
      }
      if (interval === 'requestAnimationFrame') {
        animationFrameRef.current = requestAnimationFrame(update)
      }
    }

    if (interval === 'requestAnimationFrame') {
      update()
    } else {
      const intervalId = setInterval(update, interval)
      return () => clearInterval(intervalId)
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [interval])

  const pause = () => {
    pausedRef.current = true
  }

  const resume = () => {
    pausedRef.current = false
  }

  return controls
    ? { now, pause, resume }
    : { now, pause: () => {}, resume: () => {} }
}
