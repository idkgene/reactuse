/**
 * A React hook that dynamically updates the browser's favicon.
 *
 * @module useFavicon
 * @param {string} url - The URL of the new favicon image.
 */
import { useEffect } from "react";

export function useFavicon(url: string) {
    /**
   * Updates the browser's favicon with the provided URL.
   *
   * This effect runs whenever the `url` parameter changes. It either finds an existing
   * `<link rel="icon">` element in the document or creates a new one. It then updates
   * the `href` attribute of the link element with the provided `url`. If a new link
   * element was created, it is appended to the `<head>` element of the document.
   *
   * The effect is cleaned up automatically by React when the component unmounts.
   */
  useEffect(() => {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = url
    document.getElementsByTagName('head')[0].appendChild(link)
  }, [url])
}
