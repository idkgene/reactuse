import { renderHook } from '@testing-library/react'
import { useArrayFindLast } from '../useArrayFindLast'

describe('useArrayFindLast', () => {
  it('should be defined', () => {
    expect(useArrayFindLast).toBeDefined()
  })

  it('should return undefined if the array is empty', () => {
    const { result } = renderHook(() => useArrayFindLast([], () => true))
    expect(result.current).toBeUndefined()
  })

  it('should return undefined if no element matches the predicate', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([1, 2, 3], (item) => item > 3)
    )
    expect(result.current).toBeUndefined()
  })

  it('should return the last element that matches the predicate', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([1, 2, 3, 2], (item) => item === 2)
    )
    expect(result.current).toBe(2)
  })

  it('should work with objects', () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Alex' },
    ]
    const { result } = renderHook(() =>
      useArrayFindLast(users, (user) => user.name === 'Alex')
    )
    expect(result.current).toEqual({ id: 3, name: 'Alex' })
  })
})
