import { useState, useEffect } from 'react';

/**
 * Options for `useShare` hook`.
 *
 * @interface UseShareOptions
 * @property {string} [title] - The title of the shared content.
 * @property {string} [text] - The text to share.
 * @property {string} [url] - The URL to share.
 * @property {File[]} files - An array of files to share.
 */
export interface UseShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files: File[];
}

/**
 * @property {boolean} isSupported - Indicates whether the Web Share API is supported by the browser.
 * @property {(overrideOptions?: UseShareOptions) => Promise<void>} share - A function to initiate the share action.
 */
export interface UseShareReturn {
  isSupported: boolean;
  share: (overrideOptions?: UseShareOptions) => Promise<void>;
}

/**
 * A React hook that provides functionality for sharing content using the Web Share API.
 *
 * This hook simplifies the process of sharing text, URLs, and files from a web application.
 * It checks for browser support and provides a convenient `share` function to initiate sharing.
 *
 * @param {UseShareOptions} [initialOptions] - Optional initial options for sharing.
 * @returns {UseShareReturn} An object containing the `isSupported` flag and the `share` function.
 *
 * @example
 * // Basic usage:
 * const { isSupported, share } = useShare();
 *
 * // Sharing with options:
 * const { share } = useShare({
 *   title: 'Check out this article',
 *   url: 'https://www.example.com/article',
 * });
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
 */
export function useShare(initialOptions?: UseShareOptions): UseShareReturn {
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    setIsSupported(
      typeof navigator !== 'undefined' && typeof navigator.share === 'function'
    );
  }, []);

  /**
   * Initiates the share action with the provided options.
   *
   * If the Web Share API is not supported, it logs a warning message to the console.
   *
   * @param {UseShareOptions} [overrideOptions] - Optional options to override the initial options.
   * @returns {Promise<void>} A promise that resolves when the share action is complete or rejected if an error occurs.
   */
  const share = async (overrideOptions?: UseShareOptions): Promise<void> => {
    if (!isSupported) {
      console.warn('Web share API is not supported in this browser.');
      return;
    }

    const options = { ...initialOptions, ...overrideOptions };

    try {
      await navigator.share(options);
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return { isSupported, share };
}
