import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIsClient } from './useIsClient'

/**
 * A React hook that checks if the current browser window matches a given media query.
 *
 * @param {string} queryString - The media query string to be checked.
 * @returns {boolean | undefined} The current match state of the media query, or undefined if the browser does not support the MediaQueryList API or if the hook is executed on the server-side.
 */

export function useMediaQuery(queryString: string) {
  const isClient = useIsClient()

  const mediaQuery = useMemo(() => {
    if (isClient) {
      try {
        return window.matchMedia(queryString)
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error)
        }
      }
    }

    return null
  }, [queryString, isClient])

  const [isMatch, setIsMatch] = useState(undefined)

  const onChange = useCallback(({ matches }: any) => {
    setIsMatch(matches)
  }, [])

  useEffect(() => {
    if (mediaQuery) {
      onChange(mediaQuery)

      mediaQuery.addEventListener('change', onChange, { passive: true })

      return () => {
        mediaQuery.removeEventListener('change', onChange)
      }
    }
  }, [mediaQuery, onChange, isClient])

  return isMatch
}
