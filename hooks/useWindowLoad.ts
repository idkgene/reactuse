import { useEffect, useState } from 'react'

/**

 * @returns {boolean} A boolean indicating if the window has finished loading.
 */

export const useWindowLoad = () => {
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