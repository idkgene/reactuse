import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useEffect, useRef } from 'react'

export default function IntersectionObserverShowcase() {
  const observerRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(observerRef, {
    threshold: 0.5,
  })

  useEffect(() => {
    if (entry) {
      console.log(`useIntersectionObserver: Element is ${entry.isIntersecting ? 'visible' : 'hidden'}`)
    }
  }, [entry])

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIntersectionObserver"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIntersectionObserver
        </h2>
        <div
          ref={observerRef}
          className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <p>
            ⬇️ Scroll this element into view to see it logged to the console. l
            this element into view to see it logged to the console.
          </p>
        </div>
      </div>
    </>
  )
}
