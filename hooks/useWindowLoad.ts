import { useEffect, useState } from 'react'

/**
 * The `useWindowLoad` custom hook in TypeScript uses `useEffect` to track the window load event and
 * returns a boolean state indicating whether the window has finished loading.
 * @returns The `useWindowLoad` custom hook returns a boolean value indicating whether the window has
 * finished loading (`isLoaded`).
 */

const useWindowLoad = () => {
  // State variable to track if the window has finished loading
  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  // Effect to handle the window load event
  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Check if the window object is available
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setIsLoaded(true);
      } else {
        window.addEventListener('load', handleLoad);
      }

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return isLoaded;
};

export default useWindowLoad;