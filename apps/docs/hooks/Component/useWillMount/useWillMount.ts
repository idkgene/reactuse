import { useRef } from 'react';

export const useWillMount = (callback: () => void): void => {
  const willMountRef = useRef(true);

  if (willMountRef.current) {
    callback();
    willMountRef.current = false;
  }
};
