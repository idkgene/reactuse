import { useCallback, useEffect } from 'react'
import { off, on } from '../utils/utils'

type Handler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void

/**
 * @param {() => void} onPageLeave - The callback function to be called when the user leaves the page.
 * @param {readonly any[]} [args=[]] - An optional array of dependencies for the `onPageLeave` callback function.
 */

export const usePageLeave = (onPageLeave: () => void, args: readonly any[] = []): void => {
  const handlerRef = useCallback<Handler>((event) => {
    const from = event.relatedTarget || (event.nativeEvent as MouseEvent).relatedTarget
    if (!from || (from as HTMLElement).nodeName === 'HTML') {
      onPageLeave()
    }
  }, [onPageLeave])

  useEffect(() => {
    if (!onPageLeave) {
      return
    }

    on(document, 'mouseout', handlerRef)
    return () => {
      off(document, 'mouseout', handlerRef)
    }
  }, [handlerRef, onPageLeave])
}