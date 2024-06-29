import * as React from 'react';

export interface UseMutationObserverOptions extends MutationObserverInit {
  window?: Window;
}

export function useMutationObserver(
  target:
    | React.RefObject<Element>
    | (() => Element | null)
    | React.RefObject<Element[]>
    | (() => Element[] | null),
  callback: MutationCallback,
  options?: UseMutationObserverOptions,
): {
  isSupported: boolean;
  stop: () => void;
  takeRecords: () => MutationRecord[] | undefined;
} {
  const observerRef = React.useRef<MutationObserver | null>(null);
  const [isSupported, setIsSupported] = React.useState(
    typeof MutationObserver !== 'undefined',
  );

  React.useEffect(() => {
    if (!isSupported) {
      return;
    }

    const getTarget = () => {
      if (target instanceof Function) {
        return target();
      } else if (Array.isArray(target.current)) {
        return target.current;
      } 
        return target.current ? [target.current] : [];
      
    };

    const observer = new MutationObserver(callback);
    observerRef.current = observer;

    const observe = () => {
      const targetElements = getTarget();
      const elementsArray = Array.isArray(targetElements)
        ? targetElements
        : [targetElements];
      elementsArray.forEach((element) => {
        if (element) {
          observer.observe(element, options);
        }
      });
    };

    observe();

    return () => {
      observer.disconnect();
    };
  }, [target, callback, options, isSupported]);

  const stop = () => {
    observerRef.current?.disconnect();
  };

  const takeRecords = () => {
    return observerRef.current?.takeRecords();
  };

  return { isSupported, stop, takeRecords };
}
