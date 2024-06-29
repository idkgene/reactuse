import { useEffect, useRef } from 'react';

export function useFirstMountState(): boolean {
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return isInitialMount.current;
}
