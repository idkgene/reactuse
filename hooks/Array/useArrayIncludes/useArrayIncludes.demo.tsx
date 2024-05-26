import React from 'react'
import { useArrayIncludes } from './useArrayIncludes'

const UseArrayIncludesDemo = () => {
  const list = [1, 2, 3, 4, 5]
  const valueToFind = 3
  const includesValue = useArrayIncludes(list, valueToFind)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Value to find: {valueToFind}</p>
      <p>Includes value: {includesValue.toString()}</p>
    </div>
  )
}

export default UseArrayIncludesDemo
