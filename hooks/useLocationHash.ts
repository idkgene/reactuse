import { useState, useEffect, useCallback } from 'react';

const useLocationHash = (): string => {
  const [hash, setHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.slice(1);
    }
    return '';
  });

  const handleHashChange = useCallback(() => {
    setHash(window.location.hash.slice(1));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
  }, [handleHashChange]);

  return hash;
};

export default useLocationHash;