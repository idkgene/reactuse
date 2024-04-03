/**
 * @param {UseIsVisibleArgs} options - An object containing options for the Intersection Observer.
 * @param {Element | Document | null} [options.root=null] - The root element to use as the intersection root for the observer.
 * @param {string} [options.rootMargin='0px'] - A string describing a set of offsets to add to the root's bounding box when calculating intersections.
 * @param {number} [options.threshold=1.0] - A numberor an array of numbers representing the percentage of the target element's visibility that should trigger the observer callback.
 * @param {boolean} [options.once=false] - A boolean indicating whether the observer should disconnect after the first intersection.
 * @returns {UseIsVisibleReturn} An object containing a function to set the ref and a boolean indicating if the element is in view.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

export type UseIsVisibleArgs = {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number
  once?: boolean
}

export type UseIsVisibleReturn = {
  setRef: (node: HTMLElement | null) => void
  inView: boolean
}

export function useIsVisible({
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  once = false,
}: UseIsVisibleArgs): UseIsVisibleReturn {
  const observer = useRef<IntersectionObserver | null>(null)
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  const setRef = useCallback((node: HTMLElement | null) => {
    if (!ref.current) {
      ref.current = node
    }
  }, [])

  const callbackFunction = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setInView(entry.isIntersecting)
    },
    [],
  )

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(callbackFunction, {
        root,
        rootMargin,
        threshold,
      })
      observer.current.observe(ref.current)
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [callbackFunction, root, rootMargin, threshold])

  useEffect(() => {
    if (once && inView) {
      observer.current?.disconnect()
    }
  }, [inView, once])

  return { setRef, inView }
}
