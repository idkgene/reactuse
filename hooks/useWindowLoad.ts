import { useEffect, useState } from 'react'

/**
 * The `useWindowLoad` custom hook in TypeScript uses `useEffect` to track the window load event and
 * returns a boolean state indicating whether the window has finished loading.
 * @returns The `useWindowLoad` custom hook returns a boolean value indicating whether the window has
 * finished loading (`isLoaded`).
 */

const useWindowLoad = () => {
  // State variable to track whether the window has finished loading
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      // Check if the document has already finished loading
      return document.readyState === 'complete';
    }
    // Return false for non-browser environments
    return false;
  });

  useEffect(() => {
    // Function to handle the window load event
    const handleLoad = () => {
      // Check if the document has finished loading
      setIsLoaded(document.readyState === 'complete');
    };

    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      // Check if the document has already finished loading
      if (document.readyState === 'complete') {
        setIsLoaded(true);
      } else {
        // Attach the load event listener
        window.addEventListener('load', handleLoad);
      }

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []); // Empty dependency array to run the effect only once on mount

  return isLoaded;
};

export default useWindowLoad;