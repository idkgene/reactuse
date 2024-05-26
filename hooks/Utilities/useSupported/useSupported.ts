import { useState, useEffect } from 'react'
import { SupportCheckCallback } from '../utilities'

/**
 * @name useSupported
 * @description A custom hook to check if a feature is supported based on the provided callback.
 *
 * @returns {boolean} `true` if the feature is supporter, otherwise `false`.
 *
 * @example
 * Usage example:
 * const isClipboardSupported = useSupported(() => !!navigator.clipboard);
 *
 * if (isClipboardSupported) {
 *   console.log('Clipboard API is supported!');
 * } else {
 *   console.log('Clipboard API is not supported.');
 * }
 */
export function useSupported(callback: SupportCheckCallback): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(false)

  useEffect(() => {
    try {
      const result = callback()
      setIsSupported(Boolean(result))
    } catch {
      setIsSupported(false)
    }
  }, [callback])

  return isSupported
}
