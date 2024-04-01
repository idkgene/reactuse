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
   * This effect runs whenever the `url` parameter changes. It first tries to find an existing
   * `<link rel="icon">` element in the document using `document.querySelector`. If no existing
   * link element is found, a new one is created using `document.createElement('link')`.
   *
   * The `type`, `rel`, and `href` attributes of the link element are set accordingly. If a new
   * link element was created, it is appended to the `<head>` element of the document using
   * `document.head.appendChild(link)`.
   *
   * To avoid potential null pointer exceptions, the code checks if `document.head` exists before
   * appending the link element. If `document.head` is not found, the link element will not be
   * appended to the document.
   *
   * The effect is cleaned up automatically by React when the component unmounts.
   */
  useEffect(() => {
    // Try to find an existing favicon link element
    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

    // If no existing link element is found, create a new one
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
    }

    // Set the href attribute of the link element to the provided URL
    link.href = url;

    // Check if the document.head exists before appending the link element
    if (document.head) {
      document.head.appendChild(link);
    }
  }, [url]);
}