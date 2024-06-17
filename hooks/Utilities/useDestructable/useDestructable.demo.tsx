import React from 'react'
import { useDestructible } from './useDestructable'

const UseDestructurableDemo = () => {
  const obj = { foo: 1, bar: 2 }
  const arr = [3, 4]

  const destructable = useDestructible(obj, arr)

  return (
    <div>
      <p>{`foo: ${destructable.foo}`}</p>
      <p>{`bar: ${destructable.bar}`}</p>
      <p>{`0: ${destructable[0]}`}</p>
      <p>{`1: ${destructable[1]}`}</p>
    </div>
  )
}

export default UseDestructurableDemo
