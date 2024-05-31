import { renderHook } from '@testing-library/react'
import { useWillUnmount } from '../useWillUnmount'

describe('useWillUnmount', () => {
  it('should call the callback when the component unmounts', () => {
    const callback = jest.fn()
    const { unmount } = renderHook(() => useWillUnmount(callback))

    expect(callback).not.toHaveBeenCalled()

    unmount()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
