import { renderHook, act } from '@testing-library/react'
import { useNow } from './useNow'

jest.useFakeTimers()

describe('useNow', () => {
  it('should return the current date', () => {
    const { result } = renderHook(() => useNow())
    expect(result.current.now).toBeInstanceOf(Date)
  })

  it('should update the date every animation frame by default', () => {
    const { result } = renderHook(() => useNow())
    const initialDate = result.current.now

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.now).not.toBe(initialDate)
  })

  it('should update the date every specified interval', () => {
    const { result } = renderHook(() => useNow({ interval: 1000 }))
    const initialDate = result.current.now

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current.now).toBe(initialDate)

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current.now).not.toBe(initialDate)
  })

  it('should pause and resume updating the date when controls are enabled', () => {
    const { result } = renderHook(() => useNow({ controls: true }))
    const initialDate = result.current.now

    act(() => {
      result.current.pause()
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.now).toBe(initialDate)

    act(() => {
      result.current.resume()
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.now).not.toBe(initialDate)
  })
})
