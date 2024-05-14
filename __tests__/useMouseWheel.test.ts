import { useMouseWheel } from '@/hooks/useMouseWheel'
import { renderHook, act } from '@testing-library/react'

describe('useMouseWheel', () => {
  it('should return 0 initially', () => {
    const { result } = renderHook(() => useMouseWheel())

    expect(result.current).toBe(0)
  })

  it('should update deltaY when a wheel event occurs', () => {
    const { result } = renderHook(() => useMouseWheel())

    act(() => {
      const wheelEvent = new WheelEvent('wheel', { deltaY: 100 })
      window.dispatchEvent(wheelEvent)
    })

    expect(result.current).toBe(100)
  })

  it('should remove the event listener when the component unmounts', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useMouseWheel())

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'wheel',
      expect.any(Function)
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'wheel',
      expect.any(Function)
    )

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })
})
