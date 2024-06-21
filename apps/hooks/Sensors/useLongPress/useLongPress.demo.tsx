import React from 'react'
import { useLongPress } from './useLongPress'

const UseLongPressDemo = () => {
  const [message, setMessage] = React.useState('')

  const handleLongPress = React.useCallback(() => {
    setMessage('Long press detected!')
  }, [])

  const { onMouseDown, onMouseUp, onTouchStart, onTouchEnd } = useLongPress(
    handleLongPress,
    { duration: 1000 }
  )

  return (
    <div>
      <p>
        Try long pressing the button below. The message will change after a long
        press of 1 second.
      </p>
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        Press me
      </button>
      <p>{message}</p>
    </div>
  )
}

export default UseLongPressDemo
