import * as React from 'react';

import { LanguageCode, UsePreferredLanguageOptions } from '../utilities';

/**
 * Detects the preferred language of the user and listens for changes, providing options for customization.
 *
 * This hook detects the user's preferred language based on the browser's `navigator.language` property.
 * It also listens for language changes and optionally calls a callback function on language change.
 *
 * @param {UsePreferredLanguageOptions} [options={}] - Options to customize the hook's behavior.
 * @param {LanguageCode} [options.initialLanguage='en'] - The initial language code to use.
 * @param {(languageCode: LanguageCode) => void} [options.onLanguageChange] - A callback function triggered when the language changes.
 * @returns {LanguageCode} The user's preferred language code.
 *
 * @example
 * Basic usage with default options
 * const preferredLanguage = usePreferredLanguage();
 * console.log(preferredLanguage); // Output: 'en'
 */
export function usePreferredLanguage(
  options: UsePreferredLanguageOptions = {}
): LanguageCode {
  const { onLanguageChange, initialLanguage = 'en' } = options;
  const [preferredLanguage, setPreferredLanguage] =
    React.useState<LanguageCode>(initialLanguage);

  React.useEffect(() => {
    const getPreferredLanguage = (): LanguageCode => {
      if (
        typeof window !== 'undefined' &&
        window.navigator &&
        window.navigator.language
      ) {
        const language = window.navigator.language;
        return language.split('-')[0];
      }
      return initialLanguage;
    };

    const handleLanguageChange = () => {
      const newLanguageCode = getPreferredLanguage();
      setPreferredLanguage(newLanguageCode);
      onLanguageChange?.(newLanguageCode);
    };

    handleLanguageChange();

    if (typeof window !== 'undefined') {
      window.addEventListener('languagechange', handleLanguageChange);

      return () => {
        window.removeEventListener('languagechange', handleLanguageChange);
      };
    }
  }, [initialLanguage, onLanguageChange]);

  return preferredLanguage;
}
