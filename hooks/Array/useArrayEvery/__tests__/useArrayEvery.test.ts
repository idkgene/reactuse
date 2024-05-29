import { renderHook } from '@testing-library/react'
import { useArrayEvery } from '../useArrayEvery'

describe('useArrayEvery', () => {
  it('should return true if the predicate returns true for all elements', () => {
    const list = [2, 4, 6, 8, 10]
    const predicate = (num: number) => num % 2 === 0

    const { result } = renderHook(() => useArrayEvery(list, predicate))

    expect(result.current).toBe(true)
  })

  it('should return false if the predicate returns false for any element', () => {
    const list = [2, 3, 6, 8, 10]
    const predicate = (num: number) => num % 2 === 0

    const { result } = renderHook(() => useArrayEvery(list, predicate))

    expect(result.current).toBe(false)
  })

  it('should return true for an empty array', () => {
    const list: number[] = []
    const predicate = (num: number) => num % 2 === 0

    const { result } = renderHook(() => useArrayEvery(list, predicate))

    expect(result.current).toBe(true)
  })

  it('should memoize the result based on the dependencies', () => {
    const list = [2, 4, 6, 8, 10]
    const predicate = (num: number) => num % 2 === 0

    const { result, rerender } = renderHook(
      ({ list, predicate }) => useArrayEvery(list, predicate),
      { initialProps: { list, predicate } }
    )

    expect(result.current).toBe(true)

    // Update the list without changing its contents
    rerender({ list: [...list], predicate })

    expect(result.current).toBe(true)

    // Update the predicate without changing its behavior
    const newPredicate = (num: number) => num % 2 === 0
    rerender({ list, predicate: newPredicate })

    expect(result.current).toBe(true)
  })
})
