"use client"
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
useIsTouchDevice

const TouchDeviceIndicator = () => {
  const isTouchDevice = useIsTouchDevice()

  return (
    <div>
      {isTouchDevice ? 'This is a touch device' : 'This is not a touch device'}
    </div>
  )
}

export default TouchDeviceIndicator