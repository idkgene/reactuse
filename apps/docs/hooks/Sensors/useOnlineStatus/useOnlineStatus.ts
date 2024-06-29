import { useState, useEffect, useCallback } from 'react';

type OnlineStatus = 'online' | 'offline';

interface UseOnlineStatusResult {
  isOnline: boolean;
  status: OnlineStatus;
}

const useOnlineStatus = (): UseOnlineStatusResult => {
  const [status, setStatus] = useState<OnlineStatus>(
    navigator.onLine ? 'online' : 'offline',
  );

  const handleOnline = useCallback(() => {
    setStatus('online');
  }, []);

  const handleOffline = useCallback(() => {
    setStatus('offline');
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return {
    isOnline: status === 'online',
    status,
  };
};

export default useOnlineStatus;
