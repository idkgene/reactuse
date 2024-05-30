import React from 'react'
import { useBoolean } from './useBoolean'

const UseBooleanDemo = () => {
  const [isToggled, toggleIsToggled, setIsToggled] = useBoolean(false)

  return (
    <div>
      <p>The toggle is {isToggled ? 'ON' : 'OFF'}.</p>
      <button onClick={toggleIsToggled}>Toggle</button>
      <button onClick={() => setIsToggled(true)}>Turn ON</button>
      <button onClick={() => setIsToggled(false)}>Turn OFF</button>
    </div>
  )
}

export default UseBooleanDemo
