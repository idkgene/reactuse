import { useLayoutEffect, useState } from 'react'

interface OrientationState {
  angle: number
  type: ScreenOrientation['type'] | 'UNKNOWN'
}

interface UseOrientationOptions {
  initialState?: OrientationState
}

export function useOrientation(
  options: UseOrientationOptions = {}
): OrientationState {
  const { initialState = { angle: 0, type: 'landscape-primary' } } = options
  const [orientation, setOrientation] = useState<OrientationState>(initialState)

  useLayoutEffect(() => {
    const handleChange = () => {
      const angle = window.screen.orientation?.angle ?? 0
      const type = window.screen.orientation?.type ?? 'landscape-primary'
      setOrientation({ angle, type })
    }

    const orientationApi = window.screen?.orientation as
      | ScreenOrientation
      | Window

    const handleOrientationChange = () => {
      const angle =
        orientationApi instanceof ScreenOrientation ? orientationApi.angle : 0

      setOrientation({
        type: 'UNKNOWN',
        angle: angle,
      })
    }

    if (orientationApi) {
      if (orientationApi instanceof ScreenOrientation) {
        handleChange()
        orientationApi.addEventListener('change', handleChange)
      } else {
        handleOrientationChange()
        orientationApi.addEventListener(
          'orientationchange',
          handleOrientationChange
        )
      }
    }

    return () => {
      if (orientationApi) {
        if (orientationApi instanceof ScreenOrientation) {
          orientationApi.removeEventListener('change', handleChange)
        } else {
          orientationApi.removeEventListener(
            'orientationchange',
            handleOrientationChange
          )
        }
      }
    }
  }, [])

  return orientation
}
