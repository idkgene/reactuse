/**
 * A React hook that determines if the code is running on the client-side or server-side.
 *
 * @returns {boolean} A boolean indicating if the code is running on the client-side.
 */

import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  /**
   * This effect runs only once, on the initial render, and sets the `isClient` state
   * to `true`. This is because, during the initial render on the server-side, the state
   * is set to `false`. After the component is hydrated on the client-side, the effect
   * runs and updates the state to `true`.
   */

  useEffect(() => {
    setClient(true)
  }, [])
  
  return isClient;
  
}