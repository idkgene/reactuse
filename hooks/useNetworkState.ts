// There's some dumb stuff hapenning here, gotta read about the connection thing to fix it
// So that the hook would work normally as expected as it should be, not how I see with the warnings and all that crap
import { useEffect, useState } from 'react'

interface NetworkState {
  online: boolean
  speed: number
  type: string
}

export function useNetworkState(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>(() => ({
    online: typeof window !== 'undefined' ? navigator.onLine : true,
    speed: 0,
    type: 'unknown',
  }))

  useEffect(() => {
    const updateNetworkState = () => {
      setNetworkState((prevState) => ({
        ...prevState,
        online: navigator.onLine,
        speed:
          'connection' in navigator
            ? (navigator as any).connection?.downlink || 0
            : 0,
        type:
          'connection' in navigator
            ? (navigator as any).connection?.effectiveType || 'unknown'
            : 'unknown',
      }))
    }

    const handleOnline = () => {
      setNetworkState((prevState) => ({ ...prevState, online: true }))
    }

    const handleOffline = () => {
      setNetworkState((prevState) => ({ ...prevState, online: false }))
    }

    if (typeof window !== 'undefined') {
      updateNetworkState()

      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      if ('connection' in navigator) {
        ;(navigator as any).connection.addEventListener(
          'change',
          updateNetworkState,
        )
      }

      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)

        if ('connection' in navigator) {
          ;(navigator as any).connection.removeEventListener(
            'change',
            updateNetworkState,
          )
        }
      }
    }
  }, [])

  return networkState
}
