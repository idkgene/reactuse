'use client'
import { useState } from 'react'
import { whenever } from './whenever'

const WheneverDemo = () => {
  const [value, setvalue] = useState(0)
  const [previousValue, setPreviousValue] = useState<number | undefined>(
    undefined
  )

  const handleIncrement = () => {
    setvalue((prevValue) => prevValue + 1)
  }

  const handleCallback = (current: number, prev: number | undefined) => {
    console.log(`New value: ${current}, Previous value: ${prev}`)
    setPreviousValue(current)
  }

  whenever(value, handleCallback)

  return (
    <>
      <div>
        <p>Current value: {value}</p>
        <p>Previous value: {previousValue}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </>
  )
}

export default WheneverDemo
