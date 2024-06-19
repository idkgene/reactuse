import { useEffect, useState } from 'react'

type WindowLoadState = 'LOADING' | 'LOADED';

/**
 * Hook that returns the current state of the `window's` loading process.
 *
 * @returns {WindowLoadState} The current state of the window's loading process. It can be either 'LOADING' or 'LOADED'.
 *
 * @example
 * const windowLoadState = useWindowLoad();
 * console.log(windowLoadState); // Output: 'LOADING' or 'LOADED'
 */
export const useWindowLoad = (): WindowLoadState => {
  const [loadState, setLoadState] = useState<WindowLoadState>('LOADING');

  useEffect(() => {
    const handleLoad = () => {
      setLoadState('LOADED');
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setLoadState('LOADED');
      } else {
        window.addEventListener('load', handleLoad);
      }

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return loadState;
};
