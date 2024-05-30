import { renderHook, act } from '@testing-library/react'
import { useInterval } from '../useInterval'

describe('useInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should increment counter on each interval', () => {
    const { result } = renderHook(() => useInterval(1000))

    expect(result.current.counter).toBe(0)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(1)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(2)
  })

  it('should not start interval if immediate is false', () => {
    const { result } = renderHook(() => useInterval(1000, { immediate: false }))

    expect(result.current.counter).toBe(0)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(0)
  })

  it('should call callback on each interval', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(1000, { callback }))

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it('should reset counter', () => {
    const { result } = renderHook(() => useInterval(1000))

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(1)

    act(() => {
      result.current.reset()
    })
    expect(result.current.counter).toBe(0)
  })

  it('should pause and resume interval', () => {
    const { result } = renderHook(() => useInterval(1000))

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(1)

    act(() => {
      result.current.pause()
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(1)

    act(() => {
      result.current.resume()
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.counter).toBe(2)
  })

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const { unmount } = renderHook(() => useInterval(1000))
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    clearIntervalSpy.mockRestore()
  })
})
