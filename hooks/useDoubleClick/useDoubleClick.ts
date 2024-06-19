import { useCallback, useRef } from 'react';

interface UseDoubleClickOptions {
  timeout?: number;
}

type ClickEvent<T = Element> = React.MouseEvent<T>;

export function useDoubleClick<T = Element>(
  doubleClick: (event: ClickEvent<T>) => void,
  click?: (event: ClickEvent<T>) => void,
  options?: UseDoubleClickOptions
): (event: ClickEvent<T>) => void {
  const defaultOptions: UseDoubleClickOptions = {
    timeout: 200,
    ...options,
  };

  const clickTimeout = useRef<number | null>(null);

  const clearClickTimeout = () => {
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return useCallback(
    (event: ClickEvent<T>) => {
      clearClickTimeout();

      if (click && event.detail === 1) {
        clickTimeout.current = window.setTimeout(() => {
          click(event);
        }, defaultOptions.timeout);
      }

      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, defaultOptions.timeout]
  );
}
