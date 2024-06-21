import * as React from 'react';

export interface ResizeObserverState {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}

export type ResizeObserverCallback = (
  entries: ReadonlyArray<ResizeObserverEntry>,
  observer: ResizeObserver
) => void;

export interface UseResizeObserverOptions {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions;
}

export const useResizeObserver = <T extends Element>(
  callback: ResizeObserverCallback,
  options?: UseResizeObserverOptions
): [React.RefObject<T>, boolean] => {
  const targetRef = React.useRef<T>(null);
  const [isSupported, setIsSupported] = React.useState(
    typeof ResizeObserver !== 'undefined'
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
