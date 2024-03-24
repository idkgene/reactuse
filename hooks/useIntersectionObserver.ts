/**
 * A React hook that uses the Intersection Observer API to track the visibility of a DOM element.
 *
 * @param {RefObject<Element>} elementRef - A React ref object that references the DOM element to observe.
 * @param {Args} options - An object containing options for the Intersection Observer.
 * @param {number} [options.threshold=0] - A number or an array of numbers representing the percentage of the target element's visibility that should trigger the observer callback.
 * @param {Element} [options.root=null] - The root element to use as the intersection root for the observer.
 * @param {string} [options.rootMargin='0%'] - A string describing a set of offsets to add to the root's bounding box when calculating intersections.
 * @param {boolean} [options.freezeOnceVisible=false] - A boolean indicating whether to freeze the observer once the target element becomes visible.
 * @returns {IntersectionObserverEntry | undefined} An object representing the current intersection information for the target element, or undefined if the Intersection Observer API is not supported or if the observer is frozen.
 */

import { RefObject, useEffect, useState } from 'react'

export interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // Disable the exhaustive-deps lint rule for this effect, as we want to re-create the observer whenever the ref or observer parameters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen])

  return entry
}
