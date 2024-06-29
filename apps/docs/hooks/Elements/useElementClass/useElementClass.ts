import { useRef, useState, useCallback, useEffect } from 'react';

interface UseElementClassReturn {
  ref: React.RefObject<HTMLElement>;
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  toggleClass: (className: string) => void;
  hasClass: (className: string) => boolean;
}

export function useElementClass(): UseElementClassReturn {
  const elementRef = useRef<HTMLElement>(null);
  const [, forceUpdate] = useState({});

  const addClass = useCallback((className: string) => {
    if (elementRef.current) {
      elementRef.current.classList.add(className);
      forceUpdate({});
    }
  }, []);

  const removeClass = useCallback((className: string) => {
    if (elementRef.current) {
      elementRef.current.classList.remove(className);
      forceUpdate({});
    }
  }, []);

  const toggleClass = useCallback((className: string) => {
    if (elementRef.current) {
      elementRef.current.classList.toggle(className);
      forceUpdate({});
    }
  }, []);

  const hasClass = useCallback((className: string): boolean => {
    return elementRef.current
      ? elementRef.current.classList.contains(className)
      : false;
  }, []);

  useEffect(() => {}, [elementRef.current]);

  return { ref: elementRef, addClass, removeClass, toggleClass, hasClass };
}
