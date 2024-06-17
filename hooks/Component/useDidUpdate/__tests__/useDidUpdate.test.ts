import { renderHook } from '@testing-library/react'
import { useDidUpdate } from '../useDidUpdate'

describe('useDidUpdate', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should call `effects` on `deps` change', () => {
    const fn = jest.fn()
    let dependency = ''
    const { rerender } = renderHook(() => useDidUpdate(fn, [dependency]))
    expect(fn).not.toHaveBeenCalled()
    dependency = 'foo'
    rerender()
    expect(fn).toHaveBeenCalled()
  })
})
