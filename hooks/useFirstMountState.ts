import { useEffect, useRef } from 'react'

export function useFirstMountState(): boolean {
  const isInitialMount = useRef<boolean>(true)

  useEffect(() => {
    isInitialMount.current = false
  }, []) // Empty dependency array ensures the effect runs only once

  return isInitialMount.current
}
