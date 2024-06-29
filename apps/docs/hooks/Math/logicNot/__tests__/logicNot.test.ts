import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { logicNot, not } from '../logicNot';

describe('logicNot', () => {
  it('should return true when the argument is falsy', () => {
    const { result } = renderHook(() => logicNot(false));
    expect(result.current).toBe(true);
  });

  it('should return false when the argument is truthy', () => {
    const { result } = renderHook(() => logicNot(true));
    expect(result.current).toBe(false);
  });

  it('should work with getter functions', () => {
    const { result } = renderHook(() => logicNot(() => false));
    expect(result.current).toBe(true);
  });

  it('should memoize the result', () => {
    const obj = { value: true };
    const { result, rerender } = renderHook(({ obj }) => logicNot(obj.value), {
      initialProps: { obj },
    });

    expect(result.current).toBe(false);

    obj.value = false;
    rerender({ obj });

    expect(result.current).toBe(true);
  });

  it('should work with the "not" alias', () => {
    const { result } = renderHook(() => not(false));
    expect(result.current).toBe(true);
  });
});
