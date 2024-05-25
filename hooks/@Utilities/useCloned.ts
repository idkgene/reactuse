import React, { useRef, useEffect, useCallback } from 'react'

interface UseClonedOptions<T = any> {
  /**
   * Custom clone function
   *
   * By default, it uses `JSON.prase(JSON.stringify(value))` to clone.
   */
  clone?: (source: T) => T

  /**
   * Manually sync the ref
   *
   * @default false;
   */
  manual?: boolean
}

interface UseClonedReturn<T> {
  /**
   * Cloned ref
   */
  cloned?: React.MutableRefObject<T>
  /**
   * Sync cloned data with source manually
   */
  sync: () => void
}

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

export function useCloned<T>(
  source: T,
  options?: UseClonedOptions<T>
): UseClonedReturn<T> {
  const cloned = useRef<T>(
    options?.clone ? options.clone(source) : cloneFnJSON(source)
  )
  const { manual = false, clone = cloneFnJSON } = options || {}

  const sync = useCallback(() => {
    cloned.current = clone(source)
  }, [source, clone])

  useEffect(() => {
    if (!manual) {
      sync()
    }
  }, [source, manual, sync])

  return { cloned, sync }
}

export default useCloned
