import * as React from 'react';

interface UseIOSToolbarStateOptions {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export function useIOSToolbarState(options: UseIOSToolbarStateOptions = {}): {
  isVisible: boolean | undefined;
} {
  const { onVisibilityChange } = options;
  const [isVisible, setIsVisible] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    const ua = window.navigator.userAgent;
    const iOS = ua.includes('iPad') || ua.includes('iPhone');
    const iOSSafari = iOS && ua.includes('WebKit') && !ua.includes('CriOS');
    let baseWindowHeight = window.innerHeight;

    function handleResize() {
      const newWindowHeight = window.innerHeight;
      const newVisibility = newWindowHeight < baseWindowHeight;
      setIsVisible(newVisibility);
      onVisibilityChange?.(newVisibility);
      baseWindowHeight = newWindowHeight;
    }

    if (iOSSafari) {
      if (
        'standalone' in window.navigator &&
        (window.navigator as any).standalone
      ) {
        setIsVisible(false);
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }

    return undefined;
  }, [onVisibilityChange]);

  return { isVisible };
}
