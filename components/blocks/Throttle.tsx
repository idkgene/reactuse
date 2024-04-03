import useThrottle from '@hooks/useThrottle'
import { Input } from '@ui-components/input'
import { useEffect, useState } from 'react'

export default function ThrottleShowcase() {
  const [inputValue, setInputValue] = useState<string>('')
  const throttledValue = useThrottle(inputValue, 500)

  useEffect(() => {
    console.log('Throttled value:', throttledValue)
  }, [throttledValue])

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useThrottle"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useThrottle
        </h2>
        <div>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your value"
          />
          <p>Throttled value: {throttledValue}</p>
        </div>
      </div>
    </>
  )
}
