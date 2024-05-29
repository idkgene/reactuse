import { renderHook } from '@testing-library/react'
import { useArrayFind } from '../useArrayFind'

describe('useArrayFind', () => {
  it('should return the first element that satisfies the predicate', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 3

    const { result } = renderHook(() => useArrayFind(list, predicate))

    expect(result.current).toBe(4)
  })

  it('should return undefined if no element satisfies the predicate', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 10

    const { result } = renderHook(() => useArrayFind(list, predicate))

    expect(result.current).toBeUndefined()
  })

  it('should memoize the result based on the list and predicate', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 3

    const { result, rerender } = renderHook(() => useArrayFind(list, predicate))

    expect(result.current).toBe(4)

    rerender()

    expect(result.current).toBe(4)
  })

  it('should return a new result when the list changes', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 3

    const { result, rerender } = renderHook(
      ({ list }) => useArrayFind(list, predicate),
      {
        initialProps: { list },
      }
    )

    expect(result.current).toBe(4)

    const newList = [6, 7, 8, 9, 10]
    rerender({ list: newList })

    expect(result.current).toBe(6)
  })

  it('should return a new result when the predicate changes', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate1 = (num: number) => num > 3
    const predicate2 = (num: number) => num > 4

    const { result, rerender } = renderHook(
      ({ predicate }) => useArrayFind(list, predicate),
      {
        initialProps: { predicate: predicate1 },
      }
    )

    expect(result.current).toBe(4)

    rerender({ predicate: predicate2 })

    expect(result.current).toBe(5)
  })
})
