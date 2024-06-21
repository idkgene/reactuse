import * as React from 'react';

/**
 * Dynamically loads a from a given URL.
 *
 * @param {string} url - The URL of the script to be loaded.
 * @return {void} This function does not return anything
 *
 * @example
 * const scriptUrl = 'https://example.com/script.js'
 * useScript(scriptUrl)
 */

export function useScript(url: string): void {
  React.useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return (): void => {
      document.body.removeChild(script);
    };
  }, [url]);
}
