import { renderHook } from '@testing-library/react'
import { useWillMount } from '../useWillMount'

describe('useWillMount', () => {
  it('should call the callback function only once before the component is mounted', () => {
    const mockCallback = jest.fn()
    const { rerender } = renderHook(() => useWillMount(mockCallback))

    expect(mockCallback).toHaveBeenCalledTimes(1)

    rerender()
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should not call the callback function on subsequent renders', () => {
    const mockCallback = jest.fn()
    const { rerender } = renderHook(() => useWillMount(mockCallback))

    expect(mockCallback).toHaveBeenCalledTimes(1)

    rerender()
    expect(mockCallback).toHaveBeenCalledTimes(1)

    rerender()
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple instances of the hook independently', () => {
    const mockCallback1 = jest.fn()
    const mockCallback2 = jest.fn()

    const { rerender } = renderHook(() => {
      useWillMount(mockCallback1)
      useWillMount(mockCallback2)
    })

    expect(mockCallback1).toHaveBeenCalledTimes(1)
    expect(mockCallback2).toHaveBeenCalledTimes(1)

    rerender()
    expect(mockCallback1).toHaveBeenCalledTimes(1)
    expect(mockCallback2).toHaveBeenCalledTimes(1)
  })
})
