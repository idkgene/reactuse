import { useEffect, useLayoutEffect } from 'react'

/**
 * React hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 *
 * @type {typeof UseEffect | typeof useLayoutEffect}
 *
 * @example
 * useIsomorphicLayoutEffect(() => {
 *    console.log('Runs on mount in both client and server environments');
 * }, []);
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
