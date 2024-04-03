
import { useEffect, useState } from 'react'

/**
 * Represents the current network state.
 *
 * @interface NetworkState
 * @property {boolean} online - Whether the device is online or offline.
 * @property {number} speed - The current network download speed in Mbps.
 * @property {string} type - The current network connection type (e.g., 'wifi', '4g', '3g', 'unknown').
 */
interface NetworkState {
  online: boolean
  speed: number
  type: string
}

/**
 * Extends the Navigator interface with additional properties related to the network connection.
 *
 * @interface NavigatorConnection
 * @extends Navigator
 * @property {object} connection - Information about the current network connection.
 * @property {number} connection.downlink - The current download speed in Mbps.
 * @property {string} connection.effectiveType - The current network connection type.
 * @property {function} [connection.onchange] - A callback function that is called when the network connection changes.
 * @property {function} connection.addEventListener - Adds an event listener for network connection changes.
 * @property {function} connection.removeEventListener - Removes an event listener for network connection changes.
 */
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
 * Custom hook that provides the current network state.
 *
 * @returns {NetworkState} An object representing the current network state.
 *
 * @example
 * const { online, speed, type } = useNetworkState();
 * console.log(`Online: ${online}`);
 * console.log(`Connection speed: ${speed} Mbps`);
 * console.log(`Connection type: ${type}`);
 */

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