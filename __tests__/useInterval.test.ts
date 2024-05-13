import { renderHook } from '@testing-library/react'
import { useInterval } from '@/hooks/@Animation/useInterval'

describe('useInterval', () => {
  it('should call the callback every interval', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useInterval(callback, 100))
    expect(callback).toHaveBeenCalledTimes(0)
    rerender
  })

  it('should stop calling the callback after unmount', () => {
    const callback = jest.fn()
    const { unmount } = renderHook(() => useInterval(callback, 100))
    unmount()
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('should not call the callback when the delay is null', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useInterval(callback, null))
    expect(callback).toHaveBeenCalledTimes(0)
    rerender
  })

  it('should update the delay', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 100 },
      }
    )

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(99)
    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ delay: 200 })

    jest.advanceTimersByTime(199)
    expect(callback).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(2)

    jest.useRealTimers()
  })
})
