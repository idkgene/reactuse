import { useEffect } from "react";

/**
 * @param {string} url - The URL of the script to be loaded.
 */

export function useScript(url: string): void {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')

    script.src = url
    script.async = true

    document.body.appendChild(script)

    return (): void => {
      document.body.removeChild(script)
    }
  }, [url])
}