import { renderHook, act } from '@testing-library/react'
import { whenever } from './whenever'

describe('whenever', () => {
  it('should call the callback when the value becomes truthy', () => {
    const callback = jest.fn()
    let value = false

    const { rerender } = renderHook(() => whenever(value, callback))

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      value = true
      rerender()
    })

    expect(callback).toHaveBeenCalledWith(true, undefined)
  })

  it('should call the callback with previous value', () => {
    const callback = jest.fn()
    let value: number | false = false

    const { rerender } = renderHook(() => whenever(value, callback))

    act(() => {
      value = 42
      rerender()
    })

    expect(callback).toHaveBeenCalledWith(42, undefined)

    act(() => {
      value = 43
      rerender()
    })

    expect(callback).toHaveBeenCalledWith(43, 42)
  })

  it('should respect the "once" options', () => {
    const callback = jest.fn()
    let value = false

    const { rerender } = renderHook(() =>
      whenever(value, callback, { once: true })
    )

    act(() => {
      value = true
      rerender()
    })

    expect(callback).toHaveBeenCalledWith(true, undefined)

    act(() => {
      value = false
      rerender()
    })

    act(() => {
      value = true
      rerender()
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
