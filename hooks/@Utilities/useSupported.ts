import { useState, useEffect } from 'react'

/**
 * A custom hook to check if a feature is supported based on the provided callback.
 *
 * @param {() => unknown} callback - A function that check for feature support and return a truthy value if supported.
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
export function useSupported(callback: () => unknown): boolean {
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
