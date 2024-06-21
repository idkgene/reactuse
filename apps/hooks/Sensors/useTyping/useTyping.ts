import * as React from 'react';

/**
 * @function useTyping
 * @description  This hook listens to `keydown` and `keyup` events on the `document` object to set the typing state.
 * It returns a boolean value that indicates whether the user is typing.
 *
 *  @returns {boolean} `True` if the user is typing, `false` otherwise.
 *
 * @example
 * import { useTyping } from './useTyping';
 *
 * function MyComponent() {
 *   const isTyping = useTyping();
 *
 *   return (
 *     <div>
 *       <p>User is typing: {isTyping ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 */
export const useTyping = (): boolean => {
  const [isTyping, setIsTyping] = React.useState(false)

  React.useEffect(() => {
    /**
     * @function handleKeyDown
     * @description Event handler for `keydown` event. Sets the typing state to true
     * @private
     */
    const handleKeyDown = () => {
      setIsTyping(true)
    }

    /**
     * @function handleKeyUp
     * @description Event handler for `keyup` event. Sets the typing state to false.
     * @private
     */
    const handleKeyUp = () => {
      setIsTyping(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return isTyping
}
