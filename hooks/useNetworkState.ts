// There's some dumb stuff hapenning here, gotta read about the connection thing to fix it
// So that the hook would work normally as expected as it should be, not how I see with the warnings and all that crap
import { useEffect, useState } from 'react';

export function useNetworkState() {
  const [networkState, setNetworkState] = useState({
    online: navigator.onLine,
    speed: ('connection' in navigator)
    // speed: navigator.connection?.downlink || 0,
    type: navigator.connection?.effectiveType || 'unknown',
  });

  useEffect(() => {
    const updateNetworkState = () => {
      setNetworkState({
        online: navigator.onLine,
        speed: navigator.connection?.downlink || 0,
        type: navigator.connection?.effectiveType || 'unknown',
      });
    };

    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);
    navigator.connection?.addEventListener('change', updateNetworkState);

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
      navigator.connection?.removeEventListener('change', updateNetworkState);
    };
  }, []);

  return networkState;
}