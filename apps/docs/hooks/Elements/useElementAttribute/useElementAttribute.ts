import { useRef, useState, useEffect, useCallback } from 'react';

type AttributeValue = string | number | boolean | null;

interface UseElementAttributeReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
  setAttribute: (name: string, value: AttributeValue) => void;
  removeAttribute: (name: string) => void;
  getAttribute: (name: string) => string | null;
}

export function useElementAttribute<
  T extends HTMLElement,
>(): UseElementAttributeReturn<T> {
  const elementRef = useRef<T>(null);
  const [, forceUpdate] = useState({});

  const setAttribute = useCallback((name: string, value: AttributeValue) => {
    if (elementRef.current) {
      if (value === null) {
        elementRef.current.removeAttribute(name);
      } else if (typeof value === 'boolean') {
        if (value) {
          elementRef.current.setAttribute(name, '');
        } else {
          elementRef.current.removeAttribute(name);
        }
      } else {
        elementRef.current.setAttribute(name, value.toString());
      }
      forceUpdate({});
    }
  }, []);

  const removeAttribute = useCallback((name: string) => {
    if (elementRef.current) {
      elementRef.current.removeAttribute(name);
      forceUpdate({});
    }
  }, []);

  const getAttribute = useCallback((name: string): string | null => {
    return elementRef.current ? elementRef.current.getAttribute(name) : null;
  }, []);

  useEffect(() => {}, [elementRef.current]);

  return { ref: elementRef, setAttribute, removeAttribute, getAttribute };
}
