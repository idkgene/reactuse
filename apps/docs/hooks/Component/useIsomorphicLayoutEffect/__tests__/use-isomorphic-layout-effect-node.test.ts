/**
 * \@jest-environment node
 */

import { useEffect } from 'react';
import { expect, it } from 'vitest';
import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';

it('should use useEffect hook', () => {
  expect(useIsomorphicLayoutEffect).toBe(useEffect);
});
