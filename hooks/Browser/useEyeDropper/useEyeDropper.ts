import { useState, useCallback, useMemo } from 'react'

interface EyeDropperOpenOptions {
  signal?: AbortSignal
}

interface UseEyeDropperOptions {
  initialValue?: string
}

interface UseEyeDropperReturn {
  isSupported: boolean
  sRGBHex: string
  open: (
    openOptions?: EyeDropperOpenOptions
  ) => Promise<{ sRGBHex: string } | undefined>
}

/**
 * @name useEyeDropper
 * @description A hook to use the eye dropper feature of the browser
 *
 *
 * @param options - Options for customizing the hook behavior.
 * @returns A tuple containing the current sRGBHex value and a function to open the eye dropper and update the sRGBHex value.
 *
 * @example
 * const { sRGBHex, open } = useEyeDropper()
 *
 * const handleClick = () => {
 *   open()
 * }
 *
 * return (
 *   <button onClick={handleClick}>
 *     Open Eye Dropper
 *   </button>
 * )
 */
export function useEyeDropper(
  options: UseEyeDropperOptions = {}
): UseEyeDropperReturn {
  const { initialValue = '' } = options
  const [sRGBHex, setSRGBHex] = useState(initialValue)

  const isSupported = useMemo(() => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      return true
    }
    return false
  }, [])

  const open = useCallback(
    async (openOptions?: EyeDropperOpenOptions) => {
      if (!isSupported) {
        return undefined
      }

      const eyeDropper = new (window as any).EyeDropper()

      try {
        const result = await eyeDropper.open(openOptions)
        setSRGBHex(result.sRGBHex)
        return result
      } catch (error) {
        console.error('EyeDropper open error:', error)
        return undefined
      }
    },
    [isSupported]
  )

  return {
    isSupported,
    sRGBHex,
    open,
  }
}
