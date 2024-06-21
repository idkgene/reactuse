import React from 'react'
import { useFirstMountState } from './useFirstMountState'

const UseFirstMountStateDemo = () => {
  const isInitialMount = useFirstMountState()

  return (
    <div>
      <p>Is Initial Mount: {isInitialMount.toString()}</p>
      {!isInitialMount && <p>This is not the initial mount</p>}
    </div>
  )
}

export default UseFirstMountStateDemo
