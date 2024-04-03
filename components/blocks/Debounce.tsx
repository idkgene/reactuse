import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { Input } from '../ui/input'

export default function DebounceShowcase() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 500)

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDeboune"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDebounce
        </h2>
        <Input
          className="mt-3"
          type="text"
          id="useDebounce"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something"
          aria-describedby="debouncedValue"
        />
        <p
          id="debouncedValue"
          className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Debounced value: {debouncedValue}
        </p>
      </div>
    </>
  )
}
