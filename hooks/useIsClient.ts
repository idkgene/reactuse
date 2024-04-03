/**
 * @returns {boolean} A boolean indicating if the code is running on the client-side.
 */

import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  }, [])
  
  return isClient;
  
}