import * as React from 'react';
import { type LanguageCode, type UsePreferredLanguageOptions } from '../utilities';

export function usePreferredLanguage(
  options: UsePreferredLanguageOptions = {},
): LanguageCode {
  const { onLanguageChange, initialLanguage = 'en' } = options;

  const getPreferredLanguage = React.useCallback((): LanguageCode => {
    if (
      typeof window !== 'undefined' &&
      window.navigator &&
      navigator.language
    ) {
      return navigator.language.split('-')[0];
    }
    return initialLanguage;
  }, [initialLanguage]);

  const [preferredLanguage, setPreferredLanguage] =
    React.useState<LanguageCode>(getPreferredLanguage);

  React.useEffect(() => {
    const handleLanguageChange = (): void => {
      const newLanguageCode = getPreferredLanguage();
      setPreferredLanguage(newLanguageCode);
      onLanguageChange?.(newLanguageCode);
    };

    handleLanguageChange(); // Initial call

    if (typeof window !== 'undefined') {
      window.addEventListener('languagechange', handleLanguageChange);
      return () => {
        window.removeEventListener('languagechange', handleLanguageChange);
      };
    }
  }, [getPreferredLanguage, onLanguageChange]);

  return preferredLanguage;
}
