import * as React from 'react';

export type DocumentReadyState = 'complete' | 'interactive' | 'loading';

export interface UseDocumentReadyStateOptions {
  initialReadyState?: DocumentReadyState;
  onReadyStateChange?: (readyState: DocumentReadyState) => void;
}

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
