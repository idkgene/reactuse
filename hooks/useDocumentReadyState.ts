/**
 * A React hook that provides the current readyState of the document.
 *
 * @module useDocumentReadyState
 * @returns {DocumentReadyState} The current readyState of the document.
 */

import { useEffect, useState } from 'react'

export function useDocumentReadyState() {
  const [readyState, setReadyState] = useState(() => {
    // Check if the document object is available
    if (typeof document !== 'undefined') {
      // If available, return the current readyState
      return document.readyState
    }
    // If not available (e.g., server-side rendering), return 'loading'
    return 'loading'
  })

  useEffect(() => {
    // Check if the document object is available
    if (typeof document === 'undefined') return

    // Set the initial readyState
    setReadyState(document.readyState)

    // Define a function to handle readyState changes
    function onStateChange() {
      setReadyState(document.readyState)
    }

    // Add an event listener for the 'readystatechange' event
    document.addEventListener('readystatechange', onStateChange, false)

    return () => document.removeEventListener('readystatechange', onStateChange, false)
  }, [])

  return readyState
}
