import { useEffect, useRef } from 'react'

/**
 * @param {function} fn - The function to be executed when the component is unmounted.
 * @returns {void}
 **/

export const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffect(
    () => () => {
      fnRef.current()
    },
    []
  )
}
