import { useState, useEffect } from 'react';

/**
 * Type representing the current preferred color scheme
 *
 * @type {('dark'|'light'|'no-preference')} ColorSchemeType
 * @property {string} dark - Indicates that the user prefers a dark color scheme.
 * @property {string} light - Indicates that the user prefers a light color scheme.
 * @property {string} no-preference - Indicates that the user has no specific color scheme preference.
 */
export type ColorSchemeType = 'dark' | 'light' | 'no-preference';

/**
 * A custom React hook that returns the current preferred color scheme which a user set
 *
 * @returns {ColorSchemeType} Current preferred color scheme of a user, can be either `dark`, `light` or `no-preference`
 *
 * @example
 * const preferredColorScheme = usePreferredColorScheme()
 */
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
