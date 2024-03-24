import { useEffect } from "react";

/**
 * A React hook that dynamically loads an external script from a given URL.
 *
 * @param {string} url - The URL of the script to be loaded.
 */

export const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}

export default useScript