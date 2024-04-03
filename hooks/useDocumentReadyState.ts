/**
 * @module useDocumentReadyState
 * @returns {DocumentReadyState} The current readyState of the document.
 */

import { useEffect, useState } from 'react'

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
