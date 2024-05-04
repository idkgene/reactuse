
import { useEffect, useState } from 'react'

interface NetworkState {
  online: boolean
  speed: number
  type: string
}

interface NavigatorConnection extends Navigator {
  connection?: {
    downlink: number
    effectiveType: string
    onchange?: () => void
    addEventListener: (event: string, listener: () => void) => void
    removeEventListener: (event: string, listener: () => void) => void
  }
}

/**
 * A custom React hook which indicates the current network state.
 * @returns {NetworkState} An object representing the current network state.
 */
export const useNetworkState = (): NetworkState => {
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
            ? (navigator as NavigatorConnection).connection?.downlink || 0
            : 0,
        type:
          'connection' in navigator
            ? (navigator as NavigatorConnection).connection?.effectiveType || 'unknown'
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
        (navigator as NavigatorConnection).connection?.addEventListener(
          'change',
          updateNetworkState,
        )
      }

      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)

        if ('connection' in navigator) {
          (navigator as NavigatorConnection).connection?.removeEventListener(
            'change',
            updateNetworkState,
          )
        }
      }
    }
  }, [])

  return networkState
}