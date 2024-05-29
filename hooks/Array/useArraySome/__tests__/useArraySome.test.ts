import { renderHook } from '@testing-library/react'
import { useArraySome } from '../useArraySome'

describe('useArraySome', () => {
  it('should return true if any element matches the predicate', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (value: number) => value > 3
    const { result } = renderHook(() => useArraySome(list, predicate))
    expect(result.current).toBe(true)
  })

  it('should return false if no elements match the predicate', () => {
    const list = [1, 2, 3]
    const predicate = (value: number) => value > 5
    const { result } = renderHook(() => useArraySome(list, predicate))
    expect(result.current).toBe(false)
  })

  it('should return false for an empty array', () => {
    const list: number[] = []
    const predicate = (value: number) => value > 0
    const { result } = renderHook(() => useArraySome(list, predicate))
    expect(result.current).toBe(false)
  })

  it('should return the same result if the list does not change', () => {
    const list = [1, 2, 3]
    const predicate = (value: number) => value > 1
    const { result, rerender } = renderHook(
      ({ list, predicate }) => useArraySome(list, predicate),
      {
        initialProps: { list, predicate },
      }
    )

    const firstResult = result.current
    rerender({ list: [...list], predicate })

    expect(result.current).toBe(firstResult)
  })

  it('should recompute the result if the list changes', () => {
    const list = [1, 2, 3]
    const predicate = (value: number) => value > 1
    const { result, rerender } = renderHook(
      ({ list, predicate }) => useArraySome(list, predicate),
      {
        initialProps: { list, predicate },
      }
    )

    const newList = [4, 5, 6]
    rerender({ list: newList, predicate })

    expect(result.current).toBe(true)
  })

  it('should recompute the result if the predicate function changes', () => {
    const list = [1, 2, 3]
    const predicate1 = (value: number) => value > 1
    const predicate2 = (value: number) => value > 2

    const { result, rerender } = renderHook(
      ({ list, predicate }) => useArraySome(list, predicate),
      {
        initialProps: { list, predicate: predicate1 },
      }
    )

    rerender({ list, predicate: predicate2 })

    expect(result.current).toBe(true)
  })
})
