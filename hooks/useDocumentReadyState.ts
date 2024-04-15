
import { useEffect, useState } from 'react'

/**
 * @module useDocumentReadyState
 * @returns {DocumentReadyState} The current readyState of the document.
 * 
 * @typedef {DocumentReadyState} DocumentReadyState
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
 */

type DocumentReadyState = "complete" | "interactive" | "loading"

export function useDocumentReadyState(): DocumentReadyState {
  const [readyState, setReadyState] = useState<DocumentReadyState>('loading')

  useEffect(() => {
    const onStateChange = () => {
      setReadyState(document.readyState as DocumentReadyState)
    }

    if (document.readyState !== 'loading') {
      setReadyState(document.readyState as DocumentReadyState)
    } else {
      document.addEventListener('readystatechange', onStateChange)
    }

    return () => {
      document.removeEventListener('readystatechange', onStateChange)
    }
  }, []) // Empty dependency array ensures the effect runs only once

  return readyState
}
