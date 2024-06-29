import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseActiveElementOptions {
  deep?: boolean;
  triggerOnRemoval?: boolean;
}

export function useActiveElement<T extends HTMLElement>(
  options: UseActiveElementOptions = {},
): T | null {
  const { deep = true, triggerOnRemoval = false } = options;
  const [activeElement, setActiveElement] = useState<T | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const handleFocusChange = useCallback(() => {
    try {
      let element = document.activeElement as T | null;

      if (deep && element?.shadowRoot) {
        element = element.shadowRoot.activeElement as T;
      }

      setActiveElement(element);
    } catch (error) {
      console.error('Error in useActiveElement hook:', error);
      throw new Error('An error occurred in the useActiveElement hook.');
    }
  }, [deep]);

  useEffect(() => {
    try {
      handleFocusChange();

      if (triggerOnRemoval) {
        const observer = new MutationObserver(handleFocusChange);
        observer.observe(document.body, { childList: true, subtree: true });
        observerRef.current = observer;
      }

      document.addEventListener('focusin', handleFocusChange);
      document.addEventListener('focusout', handleFocusChange);

      return () => {
        document.removeEventListener('focusin', handleFocusChange);
        document.removeEventListener('focusout', handleFocusChange);

        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error in useActiveElement hook:', error);
      throw new Error('An error occurred in the useActiveElement hook.');
    }
  }, [deep, triggerOnRemoval, handleFocusChange]);

  return activeElement;
}

export default useActiveElement;
