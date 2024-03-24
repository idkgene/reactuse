/**
 * A React hook that determines if the current environment is in debug mode.
 *
 * @module useDebug
 * @returns {boolean} True if the current environment is in debug mode, false otherwise.
 */

import { useMemo } from "react";
import { useIsClient } from "./useIsClient";

export function useDebug() {
  const isClient = useIsClient()
  const debug = useMemo(
    () =>
      isClient &&
      (window.location.href.includes('#debug') || process.env.NODE_ENV === 'development') &&
      !window.location.href.includes('#production'),
    [isClient]
  )

  return debug
}
