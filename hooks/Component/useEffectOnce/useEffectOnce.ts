import { useEffect } from 'react'

/**
 * Options for the `useEffectOnce` hook.
 *
 * @interface UseEffectOnceOptions
 * @property {() => void | (() => void)} - The effect to run once on mount, optionally returning a cleanup function.
 */
interface UseEffectOnceOptions {
  effect: () => void | (() => void)
}

/**
 * React hook that runs a given effect function only once on component mount.
 *
 * @param {UseEffectOnceOptions} options - An object containing the effect function to execute once.
 *
 * @example
 * useEffectOnce({
 *    effect: () => {
 *      console.log('Component mounted');
 *      return() => {
 *        console.log('Component unmounted')
 *      };
 *    }
 * })
 */
export function useEffectOnce(options: UseEffectOnceOptions) {
  const { effect } = options

  useEffect(() => {
    const destroyFn = effect()

    return () => {
      if (destroyFn && typeof destroyFn === 'function') {
        destroyFn()
      }
    }
  }, [])
}
