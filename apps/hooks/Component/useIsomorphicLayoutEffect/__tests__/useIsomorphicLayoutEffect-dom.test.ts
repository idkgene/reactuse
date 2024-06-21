import React from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

it('should use useLayoutEffect hook', () => {
  expect(useIsomorphicLayoutEffect).toBe(React.useLayoutEffect)
})
