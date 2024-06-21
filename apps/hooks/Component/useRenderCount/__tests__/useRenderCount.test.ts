import { renderHook } from '@testing-library/react'
import { useRenderCount } from '../useRenderCount'

it('should return 0 on initial render', () => {
  const { result } = renderHook(useRenderCount)

  expect(result.current).toBe(0)
})

it('should increment the render count after each re-render', () => {
  const { result, rerender } = renderHook(useRenderCount)

  rerender()
  expect(result.current).toBe(1)

  rerender()
  expect(result.current).toBe(2)
})
