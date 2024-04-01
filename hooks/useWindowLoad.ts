import { useEffect, useState } from 'react'

/**
 * The `useWindowLoad` custom hook in TypeScript uses `useEffect` to track the window load event and
 * returns a boolean state indicating whether the window has finished loading.
 * @returns The `useWindowLoad` custom hook returns a boolean value indicating whether the window has
 * finished loading (`isLoaded`).
 */

const useWindowLoad = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(document.readyState === 'complete')
    }

    handleLoad()

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return isLoaded
}

export default useWindowLoad
