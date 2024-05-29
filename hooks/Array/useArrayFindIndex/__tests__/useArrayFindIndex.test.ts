import { renderHook } from '@testing-library/react'
import { useArrayFindIndex } from '../useArrayFindIndex'

describe('useArrayFindIndex', () => {
  it('should be defined', () => {
    expect(useArrayFindIndex).toBeDefined()
  })

  it('should return -1 if the array is empty', () => {
    const { result } = renderHook(() => useArrayFindIndex([], () => true))
    expect(result.current).toBe(-1)
  })

  it('should return -1 if no element matches the predicate', () => {
    const { result } = renderHook(() => useArrayFindIndex([1, 2, 3], (item) => item > 3))
    expect(result.current).toBe(-1)
  })

  it('should return the index of the first element that matches the predicate', () => {
    const { result } = renderHook(() => useArrayFindIndex([1, 2, 3], (item) => item > 1))
    expect(result.current).toBe(1)
  })

  it('should return the index of the first element that matches the predicate, even if there are multiple matches', () => {
    const { result } = renderHook(() => useArrayFindIndex([1, 2, 3, 2], (item) => item === 2))
    expect(result.current).toBe(1)
  })

  it('should work with objects', () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const { result } = renderHook(() => useArrayFindIndex(users, (user) => user.name === 'Jane'))
    expect(result.current).toBe(1)
  })
})