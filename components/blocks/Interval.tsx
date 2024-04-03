import { useInterval } from '@hooks/useInterval'
import { useState } from 'react'

export default function IntervalShowcase() {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount((prevCount) => (prevCount + 1) % 25)
  }, 1000)

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useInterval"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useInterval
        </h2>
        <div>
          <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            ⏱ Count {count}
          </p>
        </div>
      </div>
    </>
  )
}
