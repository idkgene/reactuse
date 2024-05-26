import { renderHook } from '@testing-library/react'
import { useArrayDifference } from './useArrayDifference'

describe('useArrayDifference', () => {
  it('should return the difference between two arrays', () => {
    const list1 = [0, 1, 2, 3, 4, 5]
    const list2 = [4, 5, 6]
    const { result } = renderHook(() => useArrayDifference(list1, list2))
    expect(result.current).toEqual([0, 1, 2, 3])
  })

  it('should return the difference between two arrays based on a key', () => {
    const list1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const list2 = [{ id: 4 }, { id: 5 }, { id: 6 }]
    const { result } = renderHook(() => useArrayDifference(list1, list2, 'id'))
    expect(result.current).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('should return the difference between two arrays based on a comparison function', () => {
    const list1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const list2 = [{ id: 4 }, { id: 5 }, { id: 6 }]
    const compareFn = (value: { id: number }, othVal: { id: number }) =>
      value.id === othVal.id
    const { result } = renderHook(() =>
      useArrayDifference(list1, list2, compareFn)
    )
    expect(result.current).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('should return an empty array when the lists are the same', () => {
    const list1 = [1, 2, 3]
    const list2 = [1, 2, 3]
    const { result } = renderHook(() => useArrayDifference(list1, list2))
    expect(result.current).toEqual([])
  })

  it('should return the original list when the values array is empty', () => {
    const list1 = [1, 2, 3]
    const list2: number[] = []
    const { result } = renderHook(() => useArrayDifference(list1, list2))
    expect(result.current).toEqual([1, 2, 3])
  })

  it('should return an empty array when the original list is empty', () => {
    const list1: number[] = []
    const list2 = [1, 2, 3]
    const { result } = renderHook(() => useArrayDifference(list1, list2))
    expect(result.current).toEqual([])
  })

  it('should memoize the result and only recompute when dependencies change', () => {
    const list1 = [1, 2, 3]
    const list2 = [3, 4, 5]
    const { result, rerender } = renderHook(
      ({ list1, list2 }) => useArrayDifference(list1, list2),
      {
        initialProps: { list1, list2 },
      }
    )
    expect(result.current).toEqual([1, 2])

    rerender({ list1, list2 })
    expect(result.current).toEqual([1, 2])

    rerender({ list1: [1, 2, 3, 4], list2 })
    expect(result.current).toEqual([1, 2])
  })
})
