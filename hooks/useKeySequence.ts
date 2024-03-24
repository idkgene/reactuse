export interface UseKeySequenceOptions {
  sequence: string
  callback: () => void
  eventType?: 'keydown' | 'keyup'
  keystrokeDelay?: number
}

export const useKeySequence = ({
  sequence,
  callback,
  eventType = 'keydown',
  keystrokeDelay = 1000,
}: UseKeySequenceOptions) => {
  function keyMapper() {
    let buffer: string[] = []
    let lastKeyTime = Date.now()

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
