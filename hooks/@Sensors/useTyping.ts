import { useState, useEffect } from 'react'

/**
 * A custom React hook which indicates when the user is typing
 * @module useTyping
 * @returns {boolean} - True if the user is typing, false otherwise
 */
export const useTyping = (): boolean => {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleKeyDown = () => {
      setIsTyping(true)
    }

    const handleKeyUp = () => {
      setIsTyping(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return isTyping
}
