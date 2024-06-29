/**
 * @jest-environment node
 */

import React from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

it('should use useEffect hook', () => {
  expect(useIsomorphicLayoutEffect).toBe(React.useEffect);
});
