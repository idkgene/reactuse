import { useEffect } from 'react'

interface UseEffectOnceOptions {
  effect: () => void | (() => void)
}

export function useEffectOnce(options: UseEffectOnceOptions) {
  const { effect } = options

  useEffect(() => {
    const destroyFn = effect()

    return () => {
      if (destroyFn && typeof destroyFn === 'function') {
        destroyFn()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
