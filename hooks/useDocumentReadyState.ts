import { useEffect, useState } from 'react'

export function useDocumentReadyState() {
  const [readyState, setReadyState] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.readyState
    }
    return 'loading'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return

    setReadyState(document.readyState)

    function onStateChange() {
      setReadyState(document.readyState)
    }

    document.addEventListener('readystatechange', onStateChange, false)

    return () => document.removeEventListener('readystatechange', onStateChange, false)
  }, [])

  return readyState
}
