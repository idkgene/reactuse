import { useState, useEffect, useRef, RefObject } from 'react';

interface UseElementVisibilityOptions extends IntersectionObserverInit {
  scrollTarget?: RefObject<HTMLElement | null>;
}

export const useElementVisibility = (
  options?: UseElementVisibilityOptions
): [RefObject<HTMLElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: options?.scrollTarget?.current ?? null,
        rootMargin: options?.rootMargin,
        threshold: options?.threshold,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options?.scrollTarget, options?.rootMargin, options?.threshold]);

  return [elementRef, isVisible];
};
