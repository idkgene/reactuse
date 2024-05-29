import { renderHook } from '@testing-library/react'
import { useArrayFilter } from '../useArrayFilter'

describe('useArrayFilter', () => {
  it('should return a new array with elements that pass the predicate', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num % 2 === 0

    const { result } = renderHook(() => useArrayFilter(list, predicate))

    expect(result.current).toEqual([2, 4])
  })

  it('should return an empty array if no elements pass the predicate', () => {
    const list = [1, 3, 5, 7, 9]
    const predicate = (num: number) => num % 2 === 0

    const { result } = renderHook(() => useArrayFilter(list, predicate))

    expect(result.current).toEqual([])
  })

  it('should pass the element, index, and array to the predicate', () => {
    const list = ['apple', 'banana', 'cherry']
    const predicate = (element: string, index: number, array: string[]) => {
      expect(array).toBe(list)
      expect(typeof index).toBe('number')
      return element.length > 5
    }

    const { result } = renderHook(() => useArrayFilter(list, predicate))

    expect(result.current).toEqual(['banana', 'cherry'])
  })

  it('should return a new array on each render if the list changes', () => {
    const { result, rerender } = renderHook(
      ({ list }) => useArrayFilter(list, (num: number) => num % 2 === 0),
      { initialProps: { list: [1, 2, 3] } }
    )

    expect(result.current).toEqual([2])

    rerender({ list: [1, 2, 3, 4, 5] })

    expect(result.current).toEqual([2, 4])
  })

  it('should return the same array on each render if the list and predicate remain the same', () => {
    const list = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num % 2 === 0

    const { result, rerender } = renderHook(() =>
      useArrayFilter(list, predicate)
    )

    const filteredArray = result.current

    rerender()

    expect(result.current).toBe(filteredArray)
  })
})
