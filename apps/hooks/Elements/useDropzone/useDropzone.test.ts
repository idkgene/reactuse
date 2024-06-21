import { renderHook, act } from '@testing-library/react'
import { useDropZone } from './useDropzone'

describe('useDropZone', () => {
  let targetRef: React.RefObject<HTMLElement>

  beforeEach(() => {
    targetRef = { current: document.createElement('div') }
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDropZone(targetRef))
    expect(result.current.files).toBeNull()
    expect(result.current.isOverDropZone).toBe(false)
  })

  it('should update isOverDropZone when dragenter event is triggered', () => {
    const { result } = renderHook(() => useDropZone(targetRef))
    act(() => {
      const event = new Event('dragenter') as unknown as DragEvent
      targetRef.current?.dispatchEvent(event)
    })
    expect(result.current.isOverDropZone).toBe(true)
  })

  it('should update isOverDropZone when dragleave event is triggered', () => {
    const { result } = renderHook(() => useDropZone(targetRef))
    act(() => {
      const event = new Event('dragleave') as unknown as DragEvent
      targetRef.current?.dispatchEvent(event)
    })
    expect(result.current.isOverDropZone).toBe(false)
  })

  it('should update files when drop event is triggered', () => {
    const { result } = renderHook(() => useDropZone(targetRef))
    const files = [new File([], 'test.txt')]
    act(() => {
      const event = new CustomEvent('drop', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
      })
      targetRef.current?.dispatchEvent(event)
    })
    expect(result.current.files).toEqual(files)
    expect(result.current.isOverDropZone).toBe(false)
  })

  it('should call onDrop callback when provided', () => {
    const onDrop = jest.fn()
    renderHook(() => useDropZone(targetRef, onDrop))
    const files = [new File([], 'test.txt')]
    act(() => {
      const event = new CustomEvent('drop', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
      })
      targetRef.current?.dispatchEvent(event)
    })
    expect(onDrop).toHaveBeenCalledWith(files, expect.any(Object))
  })

  it('should call onEnter callback when provided', () => {
    const onEnter = jest.fn()
    renderHook(() => useDropZone(targetRef, { onEnter }))
    const files = [new File([], 'test.txt')]
    act(() => {
      const event = new CustomEvent('dragenter', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
      })
      targetRef.current?.dispatchEvent(event)
    })
    expect(onEnter).toHaveBeenCalledWith(files, expect.any(Object))
  })

  it('should call onLeave callback when provided', () => {
    const onLeave = jest.fn()
    renderHook(() => useDropZone(targetRef, { onLeave }))
    const files = [new File([], 'test.txt')]
    act(() => {
      const event = new CustomEvent('dragleave', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
      })
      targetRef.current?.dispatchEvent(event)
    })
    expect(onLeave).toHaveBeenCalledWith(files, expect.any(Object))
  })

  it('should call onOver callback when provided', () => {
    const onOver = jest.fn()
    renderHook(() => useDropZone(targetRef, { onOver }))
    const files = [new File([], 'test.txt')]
    act(() => {
      const event = new CustomEvent('dragover', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
      })
      targetRef.current?.dispatchEvent(event)
    })
    expect(onOver).toHaveBeenCalledWith(files, expect.any(Object))
  })
})
