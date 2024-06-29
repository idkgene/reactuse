import { useEffect, useCallback } from 'react';

interface UseBeforeUnloadOptions {
  enabled?: boolean;
}

const useBeforeUnload = (
  shouldPreventUnload: () => boolean,
  options: UseBeforeUnloadOptions = {},
): void => {
  const { enabled = true } = options;

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      try {
        if (enabled && shouldPreventUnload()) {
          event.preventDefault();
          event.returnValue = '';
        }
      } catch (error) {
        console.error('Error in beforeunload handler:', error);
        throw new Error(
          `BeforeUnload handler failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
    [enabled, shouldPreventUnload],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      throw new Error(
        'useBeforeUnload hook can only be used in a browser environment',
      );
    }

    if (typeof shouldPreventUnload !== 'function') {
      throw new TypeError('shouldPreventUnload must be a function');
    }

    try {
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } catch (error) {
      console.error('Error setting up beforeunload listener:', error);
      throw new Error(
        `Failed to set up BeforeUnload listener: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }, [handleBeforeUnload, shouldPreventUnload]);
};

export default useBeforeUnload;
