import { renderHook } from "@testing-library/react"
import { useDestructurable } from "./useDestructable"

describe('useDestructurable', () => {
  it('should return a destructurable object and array', () => {
    const obj = { name: 'John', age: 30 }
    const arr = ['apple', 'banana', 'orange']

    const { result } = renderHook(() => useDestructurable(obj, arr))

    expect(result.current).toEqual({
      name: 'John',
      age: 30,
      0: 'apple',
      1: 'banana',
      2: 'orange',
    })
  })

  it('should return a new object when the input object or array changes', () => {
    const obj1 = { name: 'John', age: 30 }
    const arr1 = ['apple', 'banana', 'orange']
    const obj2 = { name: 'Jane', age: 25 }
    const arr2 = ['grape', 'kiwi']

    const { result, rerender } = renderHook(
      ({ obj, arr }) => useDestructurable(obj, arr),
      {
        initialProps: { obj: obj1, arr: arr1 },
      },
    )

    expect(result.current).toEqual({
      name: 'John',
      age: 30,
      0: 'apple',
      1: 'banana',
      2: 'orange',
    })

    rerender({ obj: obj2, arr: arr2 })

    expect(result.current).toEqual({
      name: 'Jane',
      age: 25,
      0: 'grape',
      1: 'kiwi',
    })
  })

  it('should return the same object if the input object and array do not change', () => {
    const obj = { name: 'John', age: 30 }
    const arr = ['apple', 'banana', 'orange']

    const { result, rerender } = renderHook(() => useDestructurable(obj, arr))

    const firstResult = result.current

    rerender()

    expect(result.current).toBe(firstResult)
  })

  it('should handle an empty object and array', () => {
    const obj = {}
    const arr: any[] = []

    const { result } = renderHook(() => useDestructurable(obj, arr))

    expect(result.current).toEqual({})
  })
})