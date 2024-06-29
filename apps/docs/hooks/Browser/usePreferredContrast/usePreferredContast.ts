import { useEffect, useState } from 'react';


export type ContrastType = 'more' | 'less' | 'custom' | 'no-preference';

export function usePreferredContrast(): ContrastType {
  const [preferredContrast, setPreferredContrast] =
    useState<ContrastType>('no-preference');

  useEffect(() => {
    const mediaQueryMore = window.matchMedia('(prefers-contrast: more)');
    const mediaQueryLess = window.matchMedia('(prefers-contrast: less)');
    const mediaQueryCustom = window.matchMedia('(prefers-contrast: custom)');

    const updatePreferredContrast = () => {
      if (mediaQueryMore.matches) {
        setPreferredContrast('more');
      } else if (mediaQueryLess.matches) {
        setPreferredContrast('less');
      } else if (mediaQueryCustom.matches) {
        setPreferredContrast('custom');
      } else {
        setPreferredContrast('no-preference');
      }
    };

    updatePreferredContrast();

    mediaQueryMore.addEventListener('change', updatePreferredContrast);
    mediaQueryLess.addEventListener('change', updatePreferredContrast);
    mediaQueryCustom.addEventListener('change', updatePreferredContrast);

    return () => {
      mediaQueryMore.removeEventListener('change', updatePreferredContrast);
      mediaQueryLess.removeEventListener('change', updatePreferredContrast);
      mediaQueryCustom.removeEventListener('change', updatePreferredContrast);
    };
  }, []);

  return preferredContrast;
}
