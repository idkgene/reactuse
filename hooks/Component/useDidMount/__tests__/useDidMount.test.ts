import { renderHook } from '@testing-library/react'
import { useDidMount } from '../useDidMount'

describe('useDidMount', () => {
  it('should call the callback once after mounting', () => {
    const callback = jest.fn()
    renderHook(() => useDidMount(callback))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not call the callback after rerendering', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useDidMount(callback))

    expect(callback).toHaveBeenCalledTimes(1)

    rerender()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not call the callback after unmounting', () => {
    const callback = jest.fn()
    const { unmount } = renderHook(() => useDidMount(callback))

    expect(callback).toHaveBeenCalledTimes(1)

    unmount()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
