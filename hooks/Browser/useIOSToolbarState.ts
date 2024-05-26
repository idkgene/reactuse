import { useEffect, useState } from 'react';

interface UseIOSToolbarStateOptions {
  onVisibilityChange?: (isVisible: boolean) => void;
}

/**
 * A React hook that detects the visibility state of the iOS toolbar.
 *
 * @param options - Options for customizing the hook behavior.
 * @returns An object containing the current visibility state of the iOS toolbar.
 */
export function useIOSToolbarState(
  options: UseIOSToolbarStateOptions = {}
): { isVisible: boolean | undefined } {
  const { onVisibilityChange } = options;
  const [isVisible, setIsVisible] = useState<boolean | undefined>();

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const iOS = ua.includes('iPad') || ua.includes('iPhone');
    const iOSSafari = iOS && ua.includes('WebKit') && !ua.includes('CriOS');
    const baseWindowHeight = window.innerHeight;

    function handleScroll() {
      const newWindowHeight = window.innerHeight;
      const newVisibility = newWindowHeight - 50 <= baseWindowHeight;
      setIsVisible(newVisibility);
      onVisibilityChange?.(newVisibility);
    }

    if (iOSSafari) {
      if ('standalone' in window.navigator && window.navigator.standalone) {
        setIsVisible(false);
        document.addEventListener('scroll', handleScroll);

        return () => {
          document.removeEventListener('scroll', handleScroll);
        };
      }
    }

    return undefined;
  }, [onVisibilityChange]);

  return { isVisible };
}