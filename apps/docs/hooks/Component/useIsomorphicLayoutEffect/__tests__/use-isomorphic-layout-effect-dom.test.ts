import { useLayoutEffect } from 'react';
import { expect, it } from 'vitest';
import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';

it('should use useLayoutEffect hook', () => {
  expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
});
