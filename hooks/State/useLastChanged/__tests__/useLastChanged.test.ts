import { renderHook, act } from '@testing-library/react'
import { useLastChanged } from '../useLastChanged'

describe('useLastChanged', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1000)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return the initial value by default', () => {
    const { result } = renderHook(() => useLastChanged(0))
    expect(result.current.current).toBe(null)
  })

  it('should return the provided initial value', () => {
    const { result } = renderHook(() =>
      useLastChanged(0, { initialValue: 500 })
    )
    expect(result.current.current).toBe(500)
  })

  it('should update lastChanged when the source changes', () => {
    const { result, rerender } = renderHook(
      ({ source }) => useLastChanged(source),
      {
        initialProps: { source: 0 },
      }
    )

    expect(result.current.current).toBe(null)

    act(() => {
      rerender({ source: 1 })
    })

    expect(result.current.current).toBe(1000)
  })

  it('should not update lastChanged when the source does not change', () => {
    const { result, rerender } = renderHook(
      ({ source }) => useLastChanged(source),
      {
        initialProps: { source: 0 },
      }
    )

    expect(result.current.current).toBe(null)

    act(() => {
      rerender({ source: 0 })
    })

    expect(result.current.current).toBe(null)
  })

  it('should use the provided equality function', () => {
    const equalityFn = jest.fn((prev, next) => prev.id === next.id)
    const { result, rerender } = renderHook(
      ({ source }) => useLastChanged(source, { equalityFn }),
      {
        initialProps: { source: { id: 1, value: 'a' } },
      }
    )

    expect(result.current.current).toBe(null)

    act(() => {
      rerender({ source: { id: 1, value: 'b' } })
    })

    expect(result.current.current).toBe(null)
    expect(equalityFn).toHaveBeenCalledWith(
      { id: 1, value: 'a' },
      { id: 1, value: 'b' }
    )

    act(() => {
      rerender({ source: { id: 2, value: 'c' } })
    })

    expect(result.current.current).toBe(1000)
    expect(equalityFn).toHaveBeenCalledWith(
      { id: 1, value: 'a' },
      { id: 2, value: 'c' }
    )
  })
})
