/**
 * A React hook that adds an event listener to detect clicks outside of a specified DOM element.
 *
 * @template T - The type of the DOM element to be observed.
 * @param {RefObject<T>} ref - A React ref object that references the DOM element to observe.
 * @param {Handler} handler - The callback function to be called when a click outside the element is detected.
 * @param {'mousedown' | 'mouseup'} [mouseEvent='mousedown'] - The mouse event type to listen for ('mousedown' or 'mouseup').
 * @returns {void}
 */

import { RefObject } from 'react'
import { useEventListener } from './useEventListener'

/**
 * A utility type representing a function that handles mouse events.
 *
 * @typedef {(event: MouseEvent) => void} Handler
  */
export type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  })
}
