/**
 * @module useDebug
 * @returns {boolean} True if the current environment is in debug mode, false otherwise.
 */

import { useMemo } from "react";
import { useIsClient } from "../Browser/useIsClient";

export const useDebug = () => {
  const isClient = useIsClient();

  const debug = useMemo(() => {
    if (isClient) {
      const hasDebugHash = window.location.hash.includes("#debug");
      const isDevelopment = process.env.NODE_ENV === "development";

      const isNotProduction = !window.location.hash.includes("#production");

      return (hasDebugHash || isDevelopment) && isNotProduction;
    }

    return false;
  }, [isClient]);

  return debug;
};
