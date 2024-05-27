import { renderHook } from '@testing-library/react'
import { useArrayUnique } from './useArrayUnique'

describe('useArrayUnique', () => {
  it('should return an empty array when given an empty array', () => {
    const { result } = renderHook(() => useArrayUnique([]))
    expect(result.current).toEqual([])
  })

  it('should return a new array with unique items', () => {
    const items = [1, 2, 3, 2, 4, 3, 5]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual([1, 2, 3, 4, 5])
  })

  it('should use the provided comparison function', () => {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'John' },
      { id: 4, name: 'Alice' },
    ]
    const compareFn = (a: { name: any; id: any }, b: { name: any; id: any }) => a.name === b.name && a.id === b.id
    const { result } = renderHook(() => useArrayUnique(items, compareFn))
    expect(result.current).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'John' },
      { id: 4, name: 'Alice' },
    ])
  })

  it('should return the same array if all items are unique', () => {
    const items = [1, 2, 3, 4, 5]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual(items)
  })

  it('should return a new array with unique items when the input array changes', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useArrayUnique(items),
      {
        initialProps: { items: [1, 2, 3] },
      }
    )
    expect(result.current).toEqual([1, 2, 3])

    rerender({ items: [1, 2, 3, 2, 4] })
    expect(result.current).toEqual([1, 2, 3, 4])
  })

  it('should handle arrays with mixed types', () => {
    const items = [1, '2', 3, '2', 4, 3, 5]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual([1, '2', 3, 4, 5])
  })

  it('should handle arrays with complex objects', () => {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
      { id: 3, name: 'Alice' },
    ]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Alice' },
    ])
  })
})
