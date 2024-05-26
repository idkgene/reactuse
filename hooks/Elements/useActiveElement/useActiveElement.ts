import { useEffect, useRef, MutableRefObject } from 'react'

export interface UseActiveElementOptions {
  /**
   * Search active element deeply inside shadow DOM
   *
   * @default true
   */
  deep?: boolean
}

/**
 * Reactive `document.activeElement`
 *
 * @param options
 */
export function useActiveElement<T extends HTMLElement>(
  options?: UseActiveElementOptions
): MutableRefObject<T | null> {
  const { deep = true } = options || {}
  const activeElementRef = useRef<T | null>(null)

  useEffect(() => {
    const handleFocus = () => {
      const activeElement = deep
        ? (document.activeElement?.shadowRoot?.activeElement as T) ||
          document.activeElement
        : (document.activeElement as T)
      activeElementRef.current = activeElement || null
    }

    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleFocus, true)

    handleFocus() // Initial update

    return () => {
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleFocus, true)
    }
  }, [deep])

  return activeElementRef
}
