import { useEffect, useRef, useState } from 'react'

type WatchCallback<T> = (current: T, previous: T | undefined) => void

interface WheneverOptions {
  once?: boolean
}

export function whenever<T>(
  value: T | false | null | undefined,
  callback: WatchCallback<T>,
  options?: WheneverOptions
) {
  const { once = false } = options || {}
  const [previous, setPrevious] = useState<T | undefined>(undefined)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (value) {
      if (!once || !hasTriggeredRef.current) {
        callback(value, previous)
        hasTriggeredRef.current = true
      }
      setPrevious(value)
    }
  }, [value, callback, previous, once])
}
