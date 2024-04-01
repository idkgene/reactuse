/**
 * A React hook that determines if the current environment is in debug mode.
 *
 * The debug mode is determined by the following conditions:
 * 1. The current environment is a client-side environment (not server-side).
 * 2. The current URL includes the `#debug` fragment, or the `NODE_ENV` environment variable is set to `'development'`.
 * 3. The current URL does not include the `#production` fragment.
 *
 * @module useDebug
 * @returns {boolean} True if the current environment is in debug mode, false otherwise.
 */

import { useMemo } from "react";
import { useIsClient } from "./useIsClient";

export function useDebug() {
  // Use the useIsClient hook to determine if the code is running on the client-side
  const isClient = useIsClient();

  // Use the useMemo hook to memoize the debug value based on the client-side environment
  const debug = useMemo(() => {
    if (isClient) {
      // Check if the current URL includes the '#debug' hash or if the NODE_ENV is set to 'development'
      const hasDebugHash = window.location.hash.includes('#debug');
      const isDevelopment = process.env.NODE_ENV === 'development';

      // Check if the current URL does not include the '#production' hash
      const isNotProduction = !window.location.hash.includes('#production');

      // Return true if either the '#debug' hash is present, the environment is 'development',
      // and the '#production' hash is not present
      return (hasDebugHash || isDevelopment) && isNotProduction;
    }

    // If not running on the client-side, return false
    return false;
  }, [isClient]);

  // Return the memoized debug value
  return debug;
}