/**
 * A React hook that determines if the current device is a touch device or not.
 *
 * @returns {boolean} A boolean indicating if the device is a touch device.
 */

import { useCallback, useEffect, useState } from 'react'

export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

   /**
   * A memoized function that checks if the device has a touch screen.
   * It uses various methods to detect touch support, including navigator.maxTouchPoints,
   * Window.matchMedia, and user agent string checks.
   */
  const check = useCallback(() => {
    let hasTouchScreen = false

    if ('maxTouchPoints' in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0
    } else {
      const mediaQueryList = window.matchMedia('(pointer:coarse)')
      if (mediaQueryList && mediaQueryList.media === '(pointer:coarse)') {
        hasTouchScreen = !!mediaQueryList.matches
      } else {

        const UA = window.navigator.userAgent
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      }
    }
    if (hasTouchScreen) {
      setIsTouchDevice(true)
    } else {
      setIsTouchDevice(false)
    }
  }, [])

  /**
   * A memoized function that calls the check function to detect touch screen support.
   * It is used as an event handler for the window.resize event.
   */
  const onResize = useCallback(() => {
    check()
  }, [check])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return isTouchDevice
}
