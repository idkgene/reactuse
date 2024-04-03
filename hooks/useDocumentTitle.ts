/**
 * @module useDocumentTitle
 * @param {string} title - The new title to set for the document.
 */

import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  /**
   * @param {string} title - The new title to set for the document.
   * @returns {void}
   */
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title]) // Only re-run the effect if the `title` value changes
}
