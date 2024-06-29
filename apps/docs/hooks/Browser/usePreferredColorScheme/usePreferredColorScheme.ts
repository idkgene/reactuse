import { useState, useEffect } from 'react';

export type ColorSchemeType = 'dark' | 'light' | 'no-preference';

export function usePreferredColorScheme(): ColorSchemeType {
  const [preferredColorScheme, setPreferredColorScheme] =
    useState<ColorSchemeType>('no-preference');

  useEffect(() => {
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaQueryLight = window.matchMedia('(prefers-color-scheme: light)');

    const updatePreferredColorScheme = () => {
      if (mediaQueryDark.matches) {
        setPreferredColorScheme('dark');
      } else if (mediaQueryLight.matches) {
        setPreferredColorScheme('light');
      } else {
        setPreferredColorScheme('no-preference');
      }
    };

    updatePreferredColorScheme();

    mediaQueryDark.addEventListener('change', updatePreferredColorScheme);
    mediaQueryLight.addEventListener('change', updatePreferredColorScheme);

    return () => {
      mediaQueryDark.removeEventListener('change', updatePreferredColorScheme);
      mediaQueryLight.removeEventListener('change', updatePreferredColorScheme);
    };
  }, []);

  return preferredColorScheme;
}
