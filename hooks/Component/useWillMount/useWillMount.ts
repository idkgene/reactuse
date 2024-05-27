import { useRef } from 'react'

/**
 * @name useWillMount
 * @description The `useWillMount` custom hook in TypeScript allows you to run a callback function only once when a
 * component is mounted.
 */

export const useWillMount = (callback: () => void): void => {
  const willMountRef = useRef(true)

  if (willMountRef.current) {
    callback()
    willMountRef.current = false
  }
}
