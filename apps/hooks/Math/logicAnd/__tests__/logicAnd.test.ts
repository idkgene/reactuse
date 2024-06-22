import { renderHook } from '@testing-library/react';
import { logicAnd, and } from '../logicAnd';
import { expect, it, describe } from 'vitest';

describe('logicAnd', () => {
  it('should return true when all arguments are truthy', () => {
    const { result } = renderHook(() => logicAnd(true, true, true));
    expect(result.current).toBe(true);
  });

  it('should return false when at least one argument is falsy', () => {
    const { result } = renderHook(() => logicAnd(true, false, true));
    expect(result.current).toBe(false);
  });

  it('should work with getter functions', () => {
    const { result } = renderHook(() =>
      logicAnd(
        () => true,
        () => false,
      ),
    );
    expect(result.current).toBe(false);
  });

  it('should memoize the result', () => {
    const obj1 = { value: true };
    const obj2 = { value: true };
    const { result, rerender } = renderHook(
      ({ obj1, obj2 }) => logicAnd(obj1.value, obj2.value),
      { initialProps: { obj1, obj2 } },
    );

    expect(result.current).toBe(true);

    obj1.value = false;
    rerender({ obj1, obj2 });

    expect(result.current).toBe(false);
  });

  it('should work with the "and" alias', () => {
    const { result } = renderHook(() => and(true, true, true));
    expect(result.current).toBe(true);
  });
});
