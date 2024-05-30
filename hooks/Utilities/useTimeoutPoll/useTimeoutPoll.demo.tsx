import React from 'react'
import { useTimeoutPoll } from './useTimeoutPoll'

const UseTimeoutPollDemo = () => {
  const { isActive, pause, resume } = useTimeoutPoll(
    async () => {
      console.log('Polling...')
    },
    1000,
    { immediate: true }
  )

  return (
    <div>
      <p>Polling Status: {isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  )
}

export default UseTimeoutPollDemo