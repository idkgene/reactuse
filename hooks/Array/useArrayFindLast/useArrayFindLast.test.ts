import { act, renderHook } from '@testing-library/react'
import { useArrayFindLast } from './useArrayFindLast'

describe('useArrayFindLast', () => {
  it('should return the last element that satisfies the condition', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([1, 2, 3, 4], (val: number) => val > 2)
    )
    expect(result.current).toBe(4)
  })

  it('should return undefined if no element satisfies the condition', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([1, 2, 3, 4], (val: number) => val > 10)
    )
    expect(result.current).toBeUndefined()
  })

  it('should update the result when the array changes', () => {
    const { result, rerender } = renderHook(
      ({ list }) => useArrayFindLast(list, (val: number) => val > 2),
      {
        initialProps: { list: [1, 2, 3] },
      }
    )
    expect(result.current).toBe(3)

    rerender({ list: [1, 2, 3, 4] })
    expect(result.current).toBe(4)
  })

  it('should update the result when the condition function changes', () => {
    const { result, rerender } = renderHook(
      ({ fn }) => useArrayFindLast([1, 2, 3, 4], fn),
      {
        initialProps: { fn: (val: number) => val > 2 },
      }
    )
    expect(result.current).toBe(4)

    rerender({ fn: (val: number) => val > 3 })
    expect(result.current).toBe(4)
  })

  it('should handle empty arrays', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([], (val: number) => val > 0)
    )
    expect(result.current).toBeUndefined()
  })
})
