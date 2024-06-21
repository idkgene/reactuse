import React from 'react'
import { useCounter } from './useCounter'

const UseCounterDemo = () => {
  const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 })

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}

export default UseCounterDemo
