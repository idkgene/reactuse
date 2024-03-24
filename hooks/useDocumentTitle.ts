/**
 * A React hook that updates the document title with the provided string.
 *
 * @module useDocumentTitle
 * @param {string} title - The new title to set for the document.
 */

import { useEffect } from "react";

export function useDocumentTitle(title: string) {
   /**
   * Updates the document title with the provided string whenever the `title` prop changes.
   *
   * This effect runs after every render and updates the `document.title` with the new `title` value.
   * The effect is cleaned up automatically by React when the component unmounts.
   */
  useEffect(() => {
    document.title = title
  }, [title])
}