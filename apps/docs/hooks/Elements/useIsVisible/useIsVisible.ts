import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIsVisibleArgs {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export interface UseIsVisibleReturn {
  setRef: (node: HTMLElement | null) => void;
  inView: boolean;
}

export const useIsVisible = ({
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  once = false,
}: UseIsVisibleArgs): UseIsVisibleReturn => {
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (!ref.current) {
      ref.current = node;
    }
  }, []);

  const callbackFunction = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setInView(entry.isIntersecting);
    },
    [],
  );

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(callbackFunction, {
        root,
        rootMargin,
        threshold,
      });
      observer.current.observe(ref.current);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callbackFunction, root, rootMargin, threshold]);

  useEffect(() => {
    if (once && inView) {
      observer.current?.disconnect();
    }
  }, [inView, once]);

  return { setRef, inView };
};
