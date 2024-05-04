import { useState, useEffect } from "react";

type LanguageCode = string;

/**
 * A custom hook that returns the preferred language code of the browser.
 * @returns {LanguageCode} The preferred language code of the browser.
 */
export const usePreferredLanguage = (): LanguageCode => {
  const [preferredLanguage, setPreferredLanguage] =
    useState<LanguageCode>("en");

  useEffect(() => {
    const getPreferredLanguage = (): LanguageCode => {
      if (typeof window !== "undefined" && window.navigator) {
        const language = window.navigator.language;
        return language.split("-")[0];
      }
      return "en";
    };

    const handleLanguageChange = () => {
      setPreferredLanguage(getPreferredLanguage());
    };

    handleLanguageChange();

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  return preferredLanguage;
};