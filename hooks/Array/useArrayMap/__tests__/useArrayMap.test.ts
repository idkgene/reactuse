import { renderHook } from '@testing-library/react'
import { useArrayMap } from '../useArrayMap'

describe('useArrayMap', () => {
  it('should return an empty array when the input list is empty', () => {
    const { result } = renderHook(() => useArrayMap([], (element) => element))
    expect(result.current).toEqual([])
  })

  it('should correctly map over the array with a callback', () => {
    const callback = jest.fn((element: number) => element * 2)
    const { result } = renderHook(() => useArrayMap([1, 2, 3], callback))

    expect(result.current).toEqual([2, 4, 6])
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenNthCalledWith(1, 1, 0, [1, 2, 3])
    expect(callback).toHaveBeenNthCalledWith(2, 2, 1, [1, 2, 3])
    expect(callback).toHaveBeenNthCalledWith(3, 3, 2, [1, 2, 3])
  })

  it('should update the mapped array if the list changes', () => {
    const callback = (element: number) => element * 2
    const { result, rerender } = renderHook(
      (props) => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback },
      }
    )

    expect(result.current).toEqual([2, 4, 6])

    rerender({ list: [4, 5, 6], callback })
    expect(result.current).toEqual([8, 10, 12])
  })

  it('should update the mapped array if the callback changes', () => {
    const callback1 = (element: number) => element * 2
    const callback2 = (element: number) => element + 1

    const { result, rerender } = renderHook(
      (props) => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback: callback1 },
      }
    )

    expect(result.current).toEqual([2, 4, 6])

    rerender({ list: [1, 2, 3], callback: callback2 })
    expect(result.current).toEqual([2, 3, 4])
  })

  it('should work with non-numeric elements', () => {
    const { result } = renderHook(() =>
      useArrayMap(['a', 'b', 'c'], (element) => element.toUpperCase())
    )
    expect(result.current).toEqual(['A', 'B', 'C'])
  })
})
