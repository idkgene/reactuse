import { useState, useEffect } from 'react'
import { LanguageCode, UsePreferredLanguageOptions } from '../utilities'

/**
 * @name usePrefferedLanguage
 * @description Custom React Hook that returns the user's preferred language based on their browser settings.
 * 
 * @returns {LanguageCode} The user's preferred language based on their browser settings.
 */
export function usePreferredLanguage(
  options: UsePreferredLanguageOptions = {}
): LanguageCode {
  const { onLanguageChange, initialLanguage = 'en' } = options
  const [preferredLanguage, setPreferredLanguage] =
    useState<LanguageCode>(initialLanguage)

  useEffect(() => {
    const getPreferredLanguage = (): LanguageCode => {
      if (typeof window !== 'undefined' && window.navigator) {
        const language = window.navigator.language
        return language.split('-')[0]
      }
      return initialLanguage
    }

    const handleLanguageChange = () => {
      const newLanguageCode = getPreferredLanguage()
      setPreferredLanguage(newLanguageCode)
      onLanguageChange?.(newLanguageCode)
    }

    handleLanguageChange()

    window.addEventListener('languagechange', handleLanguageChange)

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange)
    }
  }, [initialLanguage, onLanguageChange])

  return preferredLanguage
}
