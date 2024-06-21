import React from 'react'
import { useEffectOnce } from './useEffectOnce'

const UseEffectOnce = () => {
  useEffectOnce({
    effect: () => {
      console.log('Component mounted')
      return () => console.log('Component unmounted')
    },
  })

  return <div>Look up to the console</div>
}

export default UseEffectOnce
