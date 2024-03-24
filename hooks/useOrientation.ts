/**
 * A React hook that provides the current orientation of the device or browser window.
 *
 * @returns {{angle: number, type: string}} An object containing the current orientation angle and type.
 */

import { useLayoutEffect, useState } from 'react'

export function useOrientation() {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: 'landscape-primary',
  })

  useLayoutEffect(() => {
     /**
     * A function to handle orientation changes using the Screen Orientation API.
     */
    const handleChange = () => {
      const { angle, type } = window.screen.orientation
      setOrientation({
        angle,
        type,
      })
    }

    /**
     * A function to handle orientation changes using the deprecated window.orientation API.
     */
    const handle_orientationchange = () => {
      setOrientation({
        type: 'UNKNOWN',
        angle: window.orientation,
      })
    }

    if (window.screen?.orientation) {
      handleChange()
      window.screen.orientation.addEventListener('change', handleChange)
    } else {
      handle_orientationchange()
      window.addEventListener('orientationchange', handle_orientationchange)
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleChange)
      } else {
        window.removeEventListener(
          'orientationchange',
          handle_orientationchange,
        )
      }
    }
  }, [])

  return orientation
}
