import { useRef, useEffect } from 'react';

export function useParentElement<T extends HTMLElement | SVGElement>(
  elementRef?: React.RefObject<T> | (() => T | null | undefined),
): React.RefObject<T> {
  const parentRef = useRef<T>(null!);

  useEffect(() => {
    const getElement = () => {
      if (elementRef instanceof Function) {
        return elementRef();
      } 
        return elementRef?.current;
      
    };

    const updateParentElement = () => {
      const element = getElement();
      parentRef.current = element?.parentElement as T;
    };

    updateParentElement();

    const observer = new MutationObserver(updateParentElement);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return parentRef;
}
