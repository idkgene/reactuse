'use client'
import React from 'react'
import { useInterval } from './useInterval'

const UseIntervalDemo: React.FC = () => {
  const { counter, reset, pause, resume } = useInterval(1000)

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={reset}>Reset</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  )
}

export default UseIntervalDemo
