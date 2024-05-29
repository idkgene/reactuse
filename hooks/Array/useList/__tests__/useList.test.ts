import { renderHook, act } from '@testing-library/react'
import { useList } from '../useList'

describe('useList', () => {
  it('should initialize with the default list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should set a new list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].set([4, 5, 6])
    })
    expect(result.current[0]).toEqual([4, 5, 6])
  })

  it('should push an element to the list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].push(4)
    })
    expect(result.current[0]).toEqual([1, 2, 3, 4])
  })

  it('should remove an element at a specific index', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].removeAt(1)
    })
    expect(result.current[0]).toEqual([1, 3])
  })

  it('should insert an element at a specific index', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].insertAt(1, 4)
    })
    expect(result.current[0]).toEqual([1, 4, 2, 3])
  })

  it('should update an element at a specific index', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].updateAt(1, 4)
    })
    expect(result.current[0]).toEqual([1, 4, 3])
  })

  it('should clear the list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].clear()
    })
    expect(result.current[0]).toEqual([])
  })

  it('should not mutate the original list when pushing', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    const originalList = result.current[0]
    act(() => {
      result.current[1].push(4)
    })
    expect(originalList).toEqual([1, 2, 3])
  })

  it('should handle updating an element at an invalid index', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].updateAt(-1, 4)
      result.current[1].updateAt(3, 4)
    })
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should initialize with an empty list', () => {
    const { result } = renderHook(() => useList())
    expect(result.current[0]).toEqual([])
  })

  it('should handle a sequence of operations', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))
    act(() => {
      result.current[1].push(4)
      result.current[1].insertAt(1, 5)
      result.current[1].updateAt(2, 6)
      result.current[1].removeAt(0)
    })
    expect(result.current[0]).toEqual([5, 6, 3, 4])
  })
})
