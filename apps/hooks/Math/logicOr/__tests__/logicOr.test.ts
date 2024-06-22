import { renderHook } from '@testing-library/react';
import { logicOr, or } from '../logicOr';
import { expect, it, describe } from 'vitest';

describe('logicOr', () => {
  it('should return true when at least one argument is truthy', () => {
    const { result } = renderHook(() => logicOr(false, true, false));
    expect(result.current).toBe(true);
  });

  it('should return false when all arguments are falsy', () => {
    const { result } = renderHook(() => logicOr(false, false, false));
    expect(result.current).toBe(false);
  });

  it('should work with getter functions', () => {
    const { result } = renderHook(() =>
      logicOr(
        () => false,
        () => true,
      ),
    );
    expect(result.current).toBe(true);
  });

  it('should memoize the result', () => {
    const obj1 = { value: false };
    const obj2 = { value: false };
    const { result, rerender } = renderHook(
      ({ obj1, obj2 }) => logicOr(obj1.value, obj2.value),
      { initialProps: { obj1, obj2 } },
    );

    expect(result.current).toBe(false);

    obj1.value = true;
    rerender({ obj1, obj2 });

    expect(result.current).toBe(true);
  });

  it('should work with the "or" alias', () => {
    const { result } = renderHook(() => or(false, true, false));
    expect(result.current).toBe(true);
  });
});
