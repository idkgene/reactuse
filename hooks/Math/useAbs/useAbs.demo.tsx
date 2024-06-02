import React from 'react'
import { useAbs } from './useAbs'

const UseAbsDemo = () => {
  const [num, setNum] = React.useState(-10)
  const absNum = useAbs(num)

  return (
    <div>
      <p>Enter a number:</p>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value, 10))}
        max={10}
        min={-10}
      />
      <p>Absolute value: {absNum}</p>
    </div>
  )
}

export default UseAbsDemo
