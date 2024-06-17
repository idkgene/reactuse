import * as React from 'react';

import { SupportCheckCallback } from '../utilities';

/**
 * Checks if a feature or capability is supported using a callback function.
 *
 * @param {SupportCheckCallback} callback - A function that checks for feature or capability support.
 * @returns {boolean} A boolean indicating whether the feature or capability is supported.
 *
 * @example
 * const isLocalStorageSupported = useSupported(() => 'localStorage' in window);
 * console.log(isLocalStorageSupported); // true or false
 */
export function useSupported(callback: SupportCheckCallback): boolean {
  const [isSupported, setIsSupported] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const result = callback();
      setIsSupported(Boolean(result));
    } catch {
      setIsSupported(false);
    }
  }, [callback]);

  return isSupported;
}
