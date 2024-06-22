import { renderHook } from '@testing-library/react';
import { useMin } from '../useMin';
import { expect, it, describe } from 'vitest';

describe('useMin', () => {
  it('should return the minimum of a single array', () => {
    const { result } = renderHook(() => useMin([1, 2, 3, 4, -1, 10]));
    expect(result.current).toBe(-1);
  });

  it('should return the minimum of multiple arguments', () => {
    const { result } = renderHook(() => useMin(5, 10, 15, -5, 0));
    expect(result.current).toBe(-5);
  });

  it('should handle references or functions inside an array', () => {
    const ref1 = 7;
    const ref2 = () => 3;
    const ref3 = 5;
    const { result } = renderHook(() => useMin([ref1, ref2, ref3]));
    expect(result.current).toBe(3);
  });

  it('should return Infinity for an empty array', () => {
    const { result } = renderHook(() => useMin([]));
    expect(result.current).toBe(Infinity);
  });

  it('should return Infinity for empty arguments', () => {
    const { result } = renderHook(() => useMin());
    expect(result.current).toBe(Infinity);
  });
});
