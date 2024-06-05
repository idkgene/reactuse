import { useEffect, useState } from 'react';

/**
 * A hook that returns the current visibility state of the document.
 *
 * @returns {DocumentVisibilityState} The current visibility state of the document.
 *
 * @example
 * const visibilityState = useDocumentVisibility();
 */
export function useDocumentVisibility(): DocumentVisibilityState {
  const [visibilityState, setVisibilityState] =
    useState<DocumentVisibilityState>(document.visibilityState);

  useEffect(() => {
    const handleVisibilityChange = () =>
      setVisibilityState(document.visibilityState);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return visibilityState;
}
