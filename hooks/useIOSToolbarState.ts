/**
 * @returns {{isVisible: boolean | undefined}} An object containing the visibility state of the iOS toolbar.
 */

import { useEffect, useState } from 'react'

export const useIOSToolbarState = () => {
  const [isVisible, setIsVisible] = useState<boolean | undefined>()

  useEffect(() => {
    const ua = window.navigator.userAgent
    const iOS = ua.includes('iPad') || ua.includes('iPhone')
    const iOSSafari = iOS && ua.includes('WebKit') && !ua.includes('CriOS')
    const baseWindowHeight = window.innerHeight

    function handleScroll() {
      const newWindowHeight = window.innerHeight
      setIsVisible(newWindowHeight - 50 <= baseWindowHeight)
    }

    if (iOSSafari) {
      if ('standalone' in window.navigator && window.navigator.standalone) {
        setIsVisible(false)
        document.addEventListener('scroll', handleScroll)

        return () => {
          document.removeEventListener('scroll', handleScroll)
        }
      }
    }

    return undefined
  }, [])

  return { isVisible }
}
