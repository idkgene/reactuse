import { renderHook } from '@testing-library/react'
import { useArrayIncludes } from '../useArrayIncludes'

describe('useArrayIncludes', () => {
  const list = [1, 2, 3, 4, 5]

  it('should return true if the value is found in the array', () => {
    const { result } = renderHook(() => useArrayIncludes(list, 3))
    expect(result.current).toBe(true)
  })

  it('should return false if the value is not found in the array', () => {
    const { result } = renderHook(() => useArrayIncludes(list, 6))
    expect(result.current).toBe(false)
  })

  it('should return true if the value is found using a custom comparator function', () => {
    const comparator = (element: number, value: number) => element === value * 2
    const { result } = renderHook(() =>
      useArrayIncludes(list, 2, { comparator })
    )
    expect(result.current).toBe(true)
  })

  it('should return true if the value is found using a property name as comparator', () => {
    const objectList = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const { result } = renderHook(() =>
      useArrayIncludes(objectList, 2, { comparator: 'id' })
    )
    expect(result.current).toBe(true)
  })

  it('should return false if the value is not found using a property name as comparator', () => {
    const objectList = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const { result } = renderHook(() =>
      useArrayIncludes(objectList, 4, { comparator: 'id' })
    )
    expect(result.current).toBe(false)
  })

  it('should return true if the value is found from the specified index', () => {
    const { result } = renderHook(() =>
      useArrayIncludes(list, 4, { fromIndex: 2 })
    )
    expect(result.current).toBe(true)
  })

  it('should return false if the value is not found from the specified index', () => {
    const { result } = renderHook(() =>
      useArrayIncludes(list, 2, { fromIndex: 2 })
    )
    expect(result.current).toBe(false)
  })
})
