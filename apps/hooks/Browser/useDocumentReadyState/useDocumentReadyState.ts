import * as React from 'react';

export type DocumentReadyState = 'complete' | 'interactive' | 'loading';

export interface UseDocumentReadyStateOptions {
  initialReadyState?: DocumentReadyState;
  onReadyStateChange?: (readyState: DocumentReadyState) => void;
}

/**
 * @name useDocumentReadyState
 * @description Custom hook that returns the current document ready state
 *
 * @param options - Options for customizing the hook behavior.
 * @returns {DocumentReadyState} The current document ready state
 *
 * @example
 * const readyState = useDocumentReadyState()
 */
export function useDocumentReadyState(
  options: UseDocumentReadyStateOptions = {},
): DocumentReadyState {
  const { initialReadyState, onReadyStateChange } = options;
  const [readyState, setReadyState] = React.useState<DocumentReadyState>(
    () => initialReadyState || (document.readyState as DocumentReadyState),
  );

  React.useEffect(() => {
    const onStateChange = () => {
      const newReadyState = document.readyState as DocumentReadyState;
      setReadyState(newReadyState);
      onReadyStateChange?.(newReadyState);
    };

    if (!initialReadyState) {
      onStateChange();
      document.addEventListener('readystatechange', onStateChange);
      return () => {
        document.removeEventListener('readystatechange', onStateChange);
      };
    }
  }, [initialReadyState, onReadyStateChange]);

  return readyState;
}
