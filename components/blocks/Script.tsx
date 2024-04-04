import { useEffect, useState } from 'react'
import useScript from '../../hooks/useScript'

export default function ScriptShowcase() {
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false)

  useScript('https://code.jquery.com/jquery-3.6.0.min.js')

  useEffect(() => {
    const scriptElement = document.querySelector(
      'script[src="https://code.jquery.com/jquery-3.6.0.min.js"]',
    )
    if (scriptElement) {
      setIsScriptLoaded(true)
    }
  }, [])
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useScript"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useScript
        </h2>
        {isScriptLoaded ? (
          <p>Script is loaded!</p>
        ) : (
          <p>Script is not loaded yet.</p>
        )}
      </div>
    </>
  )
}
