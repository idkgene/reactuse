import { renderHook, act } from '@testing-library/react'
import { useDefault } from '../useDefault'

describe('useDefault hook', () => {
  it('should initialize state with the provided default value', () => {
    const { result } = renderHook(() => useDefault('initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('should initialize state with null if default value is null', () => {
    const { result } = renderHook(() => useDefault(null))
    expect(result.current[0]).toBeNull()
  })

  it('should update state with the new value', () => {
    const { result } = renderHook(() => useDefault('initial'))
    act(() => {
      result.current[1]('new value')
    })
    expect(result.current[0]).toBe('new value')
  })

  it('should update state with the default value if null is passed', () => {
    const { result } = renderHook(() => useDefault('initial'))
    act(() => {
      result.current[1](null)
    })
    expect(result.current[0]).toBe('initial')
  })

  it('should not update state if the new value is the same as the current value', () => {
    const { result } = renderHook(() => useDefault('initial'))
    const prevState = result.current[0]
    act(() => {
      result.current[1]('initial')
    })
    expect(result.current[0]).toBe(prevState)
  })

  it('should not update state if the new value is null and the current value is the default value', () => {
    const { result } = renderHook(() => useDefault('initial'))
    const prevState = result.current[0]
    act(() => {
      result.current[1](null)
    })
    expect(result.current[0]).toBe(prevState)
  })
})
