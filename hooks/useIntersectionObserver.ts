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

interface Args extends IntersectionObserverInit {
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
  // State variable to store the current IntersectionObserverEntry
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  // Check if the element is frozen (i.e., has already become visible and freezeOnceVisible is true)
  const frozen = entry?.isIntersecting && freezeOnceVisible

  // Callback function to update the entry state when the intersection changes
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    // Get the current DOM node from the ref
    const node = elementRef?.current

    // Check if the Intersection Observer API is supported by the browser
    const hasIOSupport =
      typeof window !== 'undefined' && !!window.IntersectionObserver

    // If Intersection Observer is not supported, the element is frozen, or the node is null, return early
    if (!hasIOSupport || frozen || !node) return

    // Create the observer parameters object
    const observerParams = { threshold, root, rootMargin }

    // Create a new Intersection Observer instance with the provided parameters and callback
    const observer = new IntersectionObserver(updateEntry, observerParams)

    // Start observing the target element
    observer.observe(node)

    // Disconnect the observer when the component unmounts or the dependencies change
    return () => {
      observer.disconnect()
    }
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen])
  // Note: JSON.stringify(threshold) is used to trigger the effect when the threshold array changes

  return entry
}
