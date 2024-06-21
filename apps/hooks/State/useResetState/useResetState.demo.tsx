import React from 'react'
import { useResetState } from './useResetState'

const ResetStateDemo = () => {
  const [state, setState, resetState] = useResetState('Initial State')

  return (
    <div>
      <p>Current State: {state}</p>
      <button onClick={() => setState('Updated State')}>Update State</button>
      <button onClick={resetState}>Reset State</button>
    </div>
  )
}

export default ResetStateDemo
