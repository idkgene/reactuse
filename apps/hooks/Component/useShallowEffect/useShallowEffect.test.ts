import { renderHook } from '@testing-library/react'
import { useShallowEffect } from './useShallowEffect'

describe('useShallowEffect', () => {
  it('should call the callback on initial render', () => {
    const callback = jest.fn()
    renderHook(() => useShallowEffect(callback, []))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call the callback when dependencies change', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(
      ({ deps }) => useShallowEffect(callback, deps),
      {
        initialProps: { deps: [1, 2] },
      }
    )
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ deps: [1, 2] })
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ deps: [1, 3] })
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should handle undefined dependencies', () => {
    const callback = jest.fn()
    renderHook(() => useShallowEffect(callback, undefined))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should handle null dependencies', () => {
    const callback = jest.fn()
    renderHook(() => useShallowEffect(callback, null))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should handle empty dependencies array', () => {
    const callback = jest.fn()
    renderHook(() => useShallowEffect(callback, []))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should handle object dependencies', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(
      ({ deps }) => useShallowEffect(callback, deps),
      {
        initialProps: { deps: [{ a: 1 }, { b: 2 }] },
      }
    )
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ deps: [{ a: 1 }, { b: 2 }] })
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ deps: [{ a: 1 }, { b: 3 }] })
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
