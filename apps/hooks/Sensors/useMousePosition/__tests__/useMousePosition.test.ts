import { renderHook, act, fireEvent } from '@testing-library/react'
import { useMousePosition } from '../useMousePosition'

describe('useMousePosition', () => {
  it('should return initial position { x: 0, y: 0 }', () => {
    const { result } = renderHook(() => useMousePosition())

    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('should update position on mouse move', () => {
    const { result } = renderHook(() => useMousePosition())

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 })
    })

    expect(result.current.x).toBe(100)
    expect(result.current.y).toBe(200)
  })

  it('should clean up mousemove event listener on unmount', () => {
    const { unmount } = renderHook(() => useMousePosition())

    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    )
  })
})
