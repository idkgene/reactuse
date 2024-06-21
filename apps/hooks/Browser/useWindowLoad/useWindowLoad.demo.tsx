import React from 'react'
import { useWindowLoad } from './useWindowLoad'

const UseWindowLoadDemo: React.FC = () => {
  const windowLoadState = useWindowLoad()

  return (
    <div>
      <p>Window Load State: {windowLoadState}</p>
    </div>
  )
}

export default UseWindowLoadDemo
