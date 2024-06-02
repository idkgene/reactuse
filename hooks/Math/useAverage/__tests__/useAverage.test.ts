import { renderHook, act } from '@testing-library/react'
import { useAverage } from '../useAverage'

describe('useAverage', () => {
  it('should return 0 for an empty array', () => {
    const { result } = renderHook(() => useAverage())
    expect(result.current).toBe(0)
  })

  it('should calculate the average of numbers', () => {
    const { result } = renderHook(() => useAverage(1, 2, 3, 4, 5))
    expect(result.current).toBe(3)
  })

  it('should calculate the average of getter functions', () => {
    const { result } = renderHook(() =>
      useAverage(
        () => 1,
        () => 2,
        () => 3,
        () => 4,
        () => 5
      )
    )
    expect(result.current).toBe(3)
  })

  it('should calculate the average of mixed numbers and getter functions', () => {
    const { result } = renderHook(() =>
      useAverage(
        1,
        () => 2,
        3,
        () => 4,
        5
      )
    )
    expect(result.current).toBe(3)
  })

  it('should update the average when the dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ a, b }) => useAverage(a, () => b),
      { initialProps: { a: 1, b: 2 } }
    )
    expect(result.current).toBe(1.5)

    rerender({ a: 2, b: 3 })
    expect(result.current).toBe(2.5)
  })

  it('should update the average when a getter function returns a new value', () => {
    let value = 2
    const { result, rerender } = renderHook(() => useAverage(1, () => value))
    expect(result.current).toBe(1.5)

    act(() => {
      value = 3
      rerender()
    })
    expect(result.current).toBe(2)
  })
})
