import { useState, useEffect } from 'react';

interface UsePreferredLangugaesOptions {
  window?: Window;
}

export function usePreferredLanguages(
  options: UsePreferredLangugaesOptions = {},
): readonly string[] {
  const { window: win = typeof window !== 'undefined' ? window : undefined } =
    options;

  const [languages, setLanguages] = useState<readonly string[]>(() => {
    if (win) {
      return win.navigator.languages;
    }
    return [];
  });

  useEffect(() => {
    if (!win) return;

    const updateLanguages = () => {
      setLanguages([...win.navigator.languages]);
    };

    win.addEventListener('languagechange', updateLanguages);

    return () => {
      win.removeEventListener('languagechange', updateLanguages);
    };
  }, [win]);

  return languages;
}
