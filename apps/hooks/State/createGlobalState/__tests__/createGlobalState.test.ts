import { renderHook, act } from '@testing-library/react'
import { createGlobalState } from '../createGlobalState'

describe('createGlobalState', () => {
  it('should initialize with primitive initial state', () => {
    const useGlobalState = createGlobalState(1)
    const { result } = renderHook(() => useGlobalState())
    expect(result.current[0]).toBe(1)
  })

  it('should initialize with function initial state', () => {
    const useGlobalState = createGlobalState(() => 42)
    const { result } = renderHook(() => useGlobalState())
    expect(result.current[0]).toBe(42)
  })

  it('should update state across multiple instances', () => {
    const useGlobalState = createGlobalState(0)
    const { result: result1 } = renderHook(() => useGlobalState())
    const { result: result2 } = renderHook(() => useGlobalState())

    act(() => {
      result1.current[1](5)
    })

    expect(result1.current[0]).toBe(5)
    expect(result2.current[0]).toBe(5)

    act(() => {
      result2.current[1]((prev) => prev + 2)
    })

    expect(result1.current[0]).toBe(7)
    expect(result2.current[0]).toBe(7)
  })

  it('should ignore null or undefined actions', () => {
    const useGlobalState = createGlobalState(10)
    const { result } = renderHook(() => useGlobalState())

    act(() => {
      result.current[1](null as any)
    })

    expect(result.current[0]).toBe(10)

    act(() => {
      result.current[1](undefined as any)
    })

    expect(result.current[0]).toBe(10)
  })

  it('should ignore actions resulting in null or undefined state', () => {
    const useGlobalState = createGlobalState(10)
    const { result } = renderHook(() => useGlobalState())

    act(() => {
      result.current[1](() => null as any)
    })

    expect(result.current[0]).toBe(10)

    act(() => {
      result.current[1](() => undefined as any)
    })

    expect(result.current[0]).toBe(10)
  })

  it('should clean up listeners on unmount', () => {
    const useGlobalState = createGlobalState(0)
    const { result: result1, unmount: unmount1 } = renderHook(() =>
      useGlobalState()
    )
    const { result: result2, unmount: unmount2 } = renderHook(() =>
      useGlobalState()
    )

    act(() => {
      result1.current[1](1)
    })

    expect(result1.current[0]).toBe(1)
    expect(result2.current[0]).toBe(1)

    unmount1()

    act(() => {
      result2.current[1](2)
    })

    expect(result1.current[0]).toBe(1)
    expect(result2.current[0]).toBe(2)

    unmount2()
  })
})
