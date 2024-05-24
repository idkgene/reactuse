import { useEffect, useState } from 'react'

type WindowLoadState = 'LOADING' | 'LOADED'

export const useWindowLoad = (): WindowLoadState => {
  const [loadState, setLoadState] = useState<WindowLoadState>('LOADING')

  useEffect(() => {
    const handleLoad = () => {
      setLoadState('LOADED')
    }

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setLoadState('LOADED')
      } else {
        window.addEventListener('load', handleLoad)
      }

      return () => {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  return loadState
}
