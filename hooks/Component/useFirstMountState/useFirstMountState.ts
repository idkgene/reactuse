import { useEffect, useRef } from 'react';

/**
 * React hook that returns `true` if the component is mounting for the first time, and `false` otherwise.
 *
 * @returns {boolean} `true` if the component is mounting for the first time, `false` otherwise.
 *
 * @example
 * const isFirstMount = useFirstMountState();
 * if (isFirstMount) {
 *    console.log('Component mounted for the first time')
 * } else {
 *    console.log('Component has been updated')
 * }
 */
export function useFirstMountState(): boolean {
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return isInitialMount.current;
}
