/**
 * A React hook that uses the Intersection Observer API to detect if an element is visible within the viewport or a specified root element.
 *
 * @param {UseIsVisibleArgs} options - An object containing options for the Intersection Observer.
 * @param {Element | Document | null} [options.root=null] - The root element to use as the intersection root for the observer.
 * @param {string} [options.rootMargin='0px'] - A string describing a set of offsets to add to the root's bounding box when calculating intersections.
 * @param {number} [options.threshold=1.0] - A number or an array of numbers representing the percentage of the target element's visibility that should trigger the observer callback.
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

    /**
   * A memoized function that sets the ref to the provided node.
   * It ensures that the ref is only updated when it's initially null.
   */
  const setRef = useCallback((node: HTMLElement | null) => {
    if (!ref.current) {
      ref.current = node
    }
  }, [])

    /**
   * A memoized callback function that updates the inView state based on the intersection entries.
   */
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
