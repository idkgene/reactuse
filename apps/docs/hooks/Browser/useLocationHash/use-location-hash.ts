import { useState, useEffect } from 'react';

export const useLocationHash = (): string => {
  // Utilize useState to manage the hash value, initializing it with
  // the current hash from the window location.
  const [hash, setHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.slice(1);
    }
    return '';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.slice(1));
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
};
