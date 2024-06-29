import * as React from 'react';

export interface ResizeObserverState {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize?: readonly ResizeObserverSize[];
  readonly contentBoxSize?: readonly ResizeObserverSize[];
  readonly devicePixelContentBoxSize?: readonly ResizeObserverSize[];
}

export type ResizeObserverCallback = (
  entries: readonly ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

export interface UseResizeObserverOptions {
  box?: ResizeObserverBoxOptions;
}

export const useResizeObserver = <T extends Element>(
  callback: ResizeObserverCallback,
  options?: UseResizeObserverOptions,
): [React.RefObject<T>, boolean] => {
  const targetRef = React.useRef<T>(null);
  const [isSupported, setIsSupported] = React.useState(
    typeof ResizeObserver !== 'undefined',
  );

  React.useEffect(() => {
    if (!isSupported) {
      return;
    }

    const observer = new ResizeObserver((entries, observer) => {
      callback(entries, observer);
    });

    const target = targetRef.current;
    if (target) {
      observer.observe(target, options);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback, options, isSupported]);

  return [targetRef, isSupported];
};
