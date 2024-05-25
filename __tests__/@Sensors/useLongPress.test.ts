import { renderHook, act } from '@testing-library/react'
import { useLongPress } from '@hooks/@Sensors/useLongPress'

describe('useLongPress', () => {
  jest.useFakeTimers()

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should call the callback after the specified duration on mouse down', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useLongPress(callback, { duration: 1000 })
    )
    const { onMouseDown, onMouseUp } = result.current

    act(() => {
      onMouseDown()
    })

    jest.advanceTimersByTime(999)
    expect(callback).not.toBeCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(callback).toBeCalled()

    act(() => {
      onMouseUp()
    })
  })

  it('should call the callback after the specified duration on touch start', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useLongPress(callback, { duration: 1000 })
    )
    const { onTouchStart, onTouchEnd } = result.current

    act(() => {
      onTouchStart()
    })

    jest.advanceTimersByTime(999)
    expect(callback).not.toBeCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(callback).toBeCalled()

    act(() => {
      onTouchEnd()
    })
  })

  it('should cancel the timer on mouse up', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useLongPress(callback, { duration: 1000 })
    )
    const { onMouseDown, onMouseUp } = result.current

    act(() => {
      onMouseDown()
    })

    jest.advanceTimersByTime(500)

    act(() => {
      onMouseUp()
    })

    jest.advanceTimersByTime(500)
    expect(callback).not.toBeCalled()
  })

  it('should cancel the timer on touch end', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useLongPress(callback, { duration: 1000 })
    )
    const { onTouchStart, onTouchEnd } = result.current

    act(() => {
      onTouchStart()
    })

    jest.advanceTimersByTime(500)

    act(() => {
      onTouchEnd()
    })

    jest.advanceTimersByTime(500)
    expect(callback).not.toBeCalled()
  })

  it('should use the default duration if not provided', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useLongPress(callback))
    const { onMouseDown, onMouseUp } = result.current

    act(() => {
      onMouseDown()
    })

    jest.advanceTimersByTime(499)
    expect(callback).not.toBeCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(callback).toBeCalled()

    act(() => {
      onMouseUp()
    })
  })
})
