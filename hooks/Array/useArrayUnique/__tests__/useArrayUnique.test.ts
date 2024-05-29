import { renderHook } from '@testing-library/react'
import { useArrayUnique } from '../useArrayUnique'

describe('useArrayUnique', () => {
  it('should return a unique array of items', () => {
    const items = [1, 2, 2, 3, 4, 4, 5]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual([1, 2, 3, 4, 5])
  })

  it('should return an empty array when given an empty array', () => {
    const items: any[] = []
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual([])
  })

  it('should use the provided compare function', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }]
    const compareFn = (a: { id: number }, b: { id: number }) => a.id === b.id
    const { result } = renderHook(() => useArrayUnique(items, compareFn))
    expect(result.current).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('should return the same array if all items are unique', () => {
    const items = [1, 2, 3, 4, 5]
    const { result } = renderHook(() => useArrayUnique(items))
    expect(result.current).toEqual(items)
  })

  it('should return a new array on each render when items change', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useArrayUnique(items),
      { initialProps: { items: [1, 2, 2, 3] } }
    )
    expect(result.current).toEqual([1, 2, 3])

    rerender({ items: [1, 2, 2, 3, 4, 4, 5] })
    expect(result.current).toEqual([1, 2, 3, 4, 5])
  })
})
