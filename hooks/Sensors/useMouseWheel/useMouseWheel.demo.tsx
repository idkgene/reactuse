import React from 'react'
import { useMouseWheel } from './useMouseWheel'

const UseMouseWheelDemo = () => {
  const deltaY = useMouseWheel()

  return (
    <div>
      <p>Mouse wheel delta Y: {deltaY}</p>
    </div>
  )
}

export default UseMouseWheelDemo
