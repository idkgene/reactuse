
import { type RefObject, useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;

    const hasIOSupport =
      typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };

    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [
    elementRef,
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    threshold,
  ]);
  // Note: JSON.stringify(threshold) is used to trigger the effect when the threshold array changes

  return entry;
};
