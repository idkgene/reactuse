import { useIsomorphicLayoutEffect } from '@/hooks/Component/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'
import { useEffect, useRef } from 'react'
import React from 'react'

type WindowEventName = keyof WindowEventMap
type HTMLElementEventName = keyof HTMLElementEventMap
type MediaQueryListEventName = keyof MediaQueryListEventMap

type EventName =
  | WindowEventName
  | HTMLElementEventName
  | MediaQueryListEventName

type TargetElement<K extends EventName> = K extends WindowEventName
  ? Window
  : K extends HTMLElementEventName
    ? HTMLElement
    : K extends MediaQueryListEventName
      ? MediaQueryList
      : never

type EventListenerOptions<K extends EventName> = K extends
  | WindowEventName
  | MediaQueryListEventName
  ? boolean | AddEventListenerOptions
  : boolean | AddEventListenerOptions | undefined

type EventListenerElement<K extends EventName> =
  | TargetElement<K>
  | React.RefObject<TargetElement<K>>

type EventHandler<K extends EventName> = (
  event: TargetElement<K> extends Window
    ? WindowEventMap[K]
    : TargetElement<K> extends HTMLElement
      ? HTMLElementEventMap[K]
      : MediaQueryListEventMap[K]
) => void

export const useEventListener = <K extends EventName>(
  eventName: K,
  handler: EventHandler<K>,
  element?: EventListenerElement<K>,
  options?: EventListenerOptions<K>
) => {
  const handlerRef = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement =
      (element as React.RefObject<TargetElement<K>>)?.current ?? window

    if (targetElement && typeof targetElement.addEventListener === 'function') {
      targetElement.addEventListener(
        eventName,
        handlerRef.current as EventListener,
        options
      )

      return () => {
        targetElement.removeEventListener(
          eventName,
          handlerRef.current as EventListener,
          options
        )
      }
    }
  }, [eventName, element, options])
}
