/**
 * @module useFavicon
 * @param {string} url - The URL of the new favicon image.
 */
import { useEffect } from "react";

export function useFavicon(url: string) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
    }

    link.href = url;

    if (document.head) {
      document.head.appendChild(link);
    }
  }, [url]);
}