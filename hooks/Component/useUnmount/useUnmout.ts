import { useRef } from 'react'
import { useEffectOnce } from '../useEffectOnce/useEffectOnce'

/**
 * @param {function} fn - The function to be executed when the component is unmounted.
 * @returns {void}
 **/

export const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}
