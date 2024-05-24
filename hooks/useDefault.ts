import { useState, useCallback } from 'react'

export const useDefault = <T>(defaultValue: T | null) => {
  const [state, setState] = useState<T | null>(() => defaultValue)

  const setValue = useCallback(
    (newValue: T | null) => {
      setState(newValue !== null ? newValue : defaultValue)
    },
    [defaultValue]
  )

  return [state, setValue] as const
}
