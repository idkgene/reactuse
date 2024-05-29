import React from 'react'
import { createGlobalState } from './createGlobalState'

// Create a global state
const useGlobalCounter = createGlobalState(0)

const Counter: React.FC = () => {
  const [count, setCount] = useGlobalCounter()

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}

const AnotherCounter: React.FC = () => {
  const [count] = useGlobalCounter()

  return (
    <div>
      <h2>Another Counter: {count}</h2>
    </div>
  )
}

const CreateGlobalStateDemoPage: React.FC = () => {
  return (
    <div>
      <Counter />
      <AnotherCounter />
    </div>
  )
}

export default CreateGlobalStateDemoPage
