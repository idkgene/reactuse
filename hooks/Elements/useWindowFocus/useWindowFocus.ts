import { useEffect, useState } from 'react'

/**
 * @module useWindowFocus
 */
export function useWindowFocus(): boolean {
  const [focused, setFocused] = useState<boolean>(false)

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', onFocus)
      window.addEventListener('blur', onBlur)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', onFocus)
        window.removeEventListener('blur', onBlur)
      }
    }
  }, [])

  return focused
}
