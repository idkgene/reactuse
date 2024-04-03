/**
 * @interface UseKeySequenceOptions
 * @property {string} sequence - The key sequence to listen for.
 * @property {() => void} callback - The callback function to be executed when the key sequence is detected.
 * @property {('keydown' | 'keyup')} [eventType='keydown'] - The event type to listen for ('keydown' or 'keyup').
 * @property {number} [keystrokeDelay=1000] - The maximum delay (in milliseconds) between keystrokes in the sequence.
 */

export interface UseKeySequenceOptions {
  sequence: string
  callback: () => void
  eventType?: 'keydown' | 'keyup'
  keystrokeDelay?: number
}

/**
 * @param {UseKeySequenceOptions} options - An object containing the options for the hook.
 * @returns {null} The hook does not return any value.
 */

export const useKeySequence = ({
  sequence,
  callback,
  eventType = 'keydown',
  keystrokeDelay = 1000,
}: UseKeySequenceOptions) => {

  function keyMapper() {
    let buffer: string[] = []
    let lastKeyTime = Date.now()

    /**
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    document.addEventListener(eventType, (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      const currentTime = Date.now()

      if (currentTime - lastKeyTime > keystrokeDelay) {
        buffer = []
      }

      buffer.push(key)
      lastKeyTime = currentTime

      if (sequence === buffer.join('')) {
        callback()
      }
    })
  }

  keyMapper()

  return null
}

export default useKeySequence
