import { useRef } from 'react'

/**
 * The `useWillMount` custom hook in TypeScript allows you to run a callback function only once when a
 * component is mounted.
 * @param callback - The `callback` parameter in the `useWillMount` custom hook is a function that will
 * be executed only once when the component is about to mount. It is a function that you pass to the
 * `useWillMount` hook, and it will be called when the component is about to mount for
 */

export const useWillMount = (callback: () => void): void => {
  const willMountRef = useRef(true)

  if (willMountRef.current) {
    callback()
    willMountRef.current = false
  }
}
