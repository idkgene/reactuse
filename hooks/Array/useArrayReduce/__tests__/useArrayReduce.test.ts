import { renderHook } from '@testing-library/react'
import { useArrayReduce } from '../useArrayReduce'

type Item = {
  value: number
}

const sumReducer = (accumulator: number, current: Item) => {
  return accumulator + current.value
}

describe('useArrayReduce', () => {
  it('should calculate the sum correctly', () => {
    const items: Item[] = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const { result } = renderHook(() => useArrayReduce(items, sumReducer, 0))

    expect(result.current).toBe(6)
  })

  it('should return the initial value when the list is empty', () => {
    const items: Item[] = []
    const { result } = renderHook(() => useArrayReduce(items, sumReducer, 10))

    expect(result.current).toBe(10)
  })

  it('should correctly handle a complex reducer', () => {
    const items: Item[] = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const complexReducer = (accumulator: string, current: Item) => {
      return `${accumulator}-${current.value}`
    }
    const { result } = renderHook(() =>
      useArrayReduce(items, complexReducer, 'init')
    )

    expect(result.current).toBe('init-1-2-3')
  })

  it('should return a memoized result for the same input', () => {
    const items: Item[] = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const { result, rerender } = renderHook(
      ({ list }) => useArrayReduce(list, sumReducer, 0),
      {
        initialProps: { list: items },
      }
    )

    const firstResult = result.current
    rerender({ list: [...items] })

    expect(result.current).toBe(firstResult)
  })

  it('should recompute the result when the list changes', () => {
    const items: Item[] = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const { result, rerender } = renderHook(
      ({ list }) => useArrayReduce(list, sumReducer, 0),
      {
        initialProps: { list: items },
      }
    )

    const newItems: Item[] = [{ value: 4 }, { value: 5 }, { value: 6 }]
    rerender({ list: newItems })

    expect(result.current).toBe(15)
  })
})
