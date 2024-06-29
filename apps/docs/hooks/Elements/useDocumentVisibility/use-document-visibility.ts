import { useEffect, useState } from 'react';

export function useDocumentVisibility(): DocumentVisibilityState {
  const [visibilityState, setVisibilityState] =
    useState<DocumentVisibilityState>(document.visibilityState);

  useEffect(() => {
    const handleVisibilityChange = (): void =>
      { setVisibilityState(document.visibilityState); };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      { document.removeEventListener('visibilitychange', handleVisibilityChange); };
  }, []);

  return visibilityState;
}
