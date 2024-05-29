import { renderHook } from '@testing-library/react'
import { useFirstMountState } from '../useFirstMountState'

describe('useFirstMountState', () => {
  it('should return true on initial render', () => {
    const { result } = renderHook(() => useFirstMountState())
    expect(result.current).toBe(true)
  })

  it('should return false on subsequent renders', () => {
    const { result, rerender } = renderHook(() => useFirstMountState())

    expect(result.current).toBe(true)

    rerender()
    expect(result.current).toBe(false)

    rerender()
    expect(result.current).toBe(false)
  })

  it('should not be affected by multiple hook instances', () => {
    const { result: result1, rerender: rerender1 } = renderHook(() =>
      useFirstMountState()
    )
    const { result: result2, rerender: rerender2 } = renderHook(() =>
      useFirstMountState()
    )

    expect(result1.current).toBe(true)
    expect(result2.current).toBe(true)

    rerender1()
    expect(result1.current).toBe(false)
    expect(result2.current).toBe(true)

    rerender2()
    expect(result1.current).toBe(false)
    expect(result2.current).toBe(false)
  })

  it('should not be affected by component updates', () => {
    const { result, rerender } = renderHook(() => useFirstMountState())

    expect(result.current).toBe(true)

    rerender({ someProp: 'new value' })
    expect(result.current).toBe(false)
  })
})
