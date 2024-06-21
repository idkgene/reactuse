import { useEffect, useRef, useState } from 'react';

export interface UseActiveElementOptions {
  /**
   * Search active element deeply inside shadow DOM
   *
   * @default true
   */
  deep?: boolean;

  /**
   * Track active element when it's removed from the DOM
   * Using a MutationObserver under the hood
   * @default true
   */
  triggerOnRemoval?: boolean;
}

/**
 * `document.activeElement`
 *
 * @param options Configuration options for the hook
 * @returns The currently active element or null
 */
export function useActiveElement<T extends HTMLElement>(
  options: UseActiveElementOptions = {}
): T | null {
  const { deep = true, triggerOnRemoval = false } = options;
  const [activeElement, setActiveElement] = useState<T | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const handleFocusChange = () => {
      let element = document.activeElement as T | null;

      if (deep && element?.shadowRoot) {
        element = element.shadowRoot.activeElement as T;
      }

      setActiveElement(element);
    };

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
  }, [deep, triggerOnRemoval]);

  return activeElement;
}

export default useActiveElement;
