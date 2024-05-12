import { useEffect, useState } from 'react'

type DocumentReadyState = 'complete' | 'interactive' | 'loading'

interface UseDocumentReadyStateOptions {
  initialReadyState?: DocumentReadyState
  onReadyStateChange?: (readyState: DocumentReadyState) => void
}

export function useDocumentReadyState(
  options: UseDocumentReadyStateOptions = {}
): DocumentReadyState {
  const { initialReadyState = 'loading', onReadyStateChange } = options
  const [readyState, setReadyState] =
    useState<DocumentReadyState>(initialReadyState)

  useEffect(() => {
    const onStateChange = () => {
      const newReadyState = document.readyState as DocumentReadyState
      setReadyState(newReadyState)
      onReadyStateChange?.(newReadyState)
    }

    if (document.readyState !== 'loading') {
      onStateChange()
    } else {
      document.addEventListener('readystatechange', onStateChange)
    }

    return () => {
      document.removeEventListener('readystatechange', onStateChange)
    }
  }, [onReadyStateChange])

  return readyState
}
