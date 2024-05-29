import React, { useState } from 'react'
import { useLastChanged } from './useLastChanged'

const UseLastChangedDemo: React.FC = () => {
  const [source, setSource] = useState('Initial value')
  const lastChanged = useLastChanged(source)

  return (
    <div>
      <p>Source: {source}</p>
      <p>
        Last changed:{' '}
        {lastChanged.current
          ? new Date(lastChanged.current).toLocaleString()
          : 'Never'}
      </p>
      <input value={source} onChange={(e) => setSource(e.target.value)} />
    </div>
  )
}

export default UseLastChangedDemo
