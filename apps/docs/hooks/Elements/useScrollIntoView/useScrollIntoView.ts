import { useRef, useCallback } from 'react';

interface ScrollIntoViewOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

interface UseScrollIntoViewReturn {
  ref: React.RefObject<HTMLElement>;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

export function useScrollIntoView(
  defaultOptions: ScrollIntoViewOptions = {},
): UseScrollIntoViewReturn {
  const elementRef = useRef<HTMLElement>(null);

  const scrollIntoView = useCallback(
    (options: ScrollIntoViewOptions = {}) => {
      if (elementRef.current) {
        const scrollOptions: ScrollIntoViewOptions = {
          behavior: options.behavior || defaultOptions.behavior || 'smooth',
          block: options.block || defaultOptions.block || 'start',
          inline: options.inline || defaultOptions.inline || 'nearest',
        };

        elementRef.current.scrollIntoView(scrollOptions);
      }
    },
    [defaultOptions],
  );

  return { ref: elementRef, scrollIntoView };
}
