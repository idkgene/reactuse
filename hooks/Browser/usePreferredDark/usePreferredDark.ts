import { useState, useEffect } from 'react';

interface ConfigurableWindow {
  window?: Window;
}

export const usePreferredDark = (options?: ConfigurableWindow): boolean => {
  const { window = globalThis.window } = options || {};

  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDark(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [window]);

  return prefersDark;
};
