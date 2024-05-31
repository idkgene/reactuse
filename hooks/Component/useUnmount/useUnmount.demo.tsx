import React from 'react'
import { useUnmount } from './useUnmout'

const UseUnmountDemo = () => {
  const handleUnmount = () => {
    console.log('Component unmounted!')
  }

  useUnmount(handleUnmount)

  return <div>My Component</div>
}

export default UseUnmountDemo
