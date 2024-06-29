import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInterpolation } from './use-interpolation';

describe('useInterpolation', () => {
  it('should interpolate correctly for different start and end values', () => {
    const { result } = renderHook(() => useInterpolation());
    const interpolate = result.current;

    expect(interpolate(0, 10, 0)).toBe(0);
    expect(interpolate(0, 10, 1)).toBe(10);
    expect(interpolate(0, 10, 0.5)).toBe(5);
    expect(interpolate(-5, 5, 0.5)).toBe(0);
    expect(interpolate(2, 8, 0.75)).toBe(6.5);
  });

  it('should handle negative values correctly', () => {
    const { result } = renderHook(() => useInterpolation());
    const interpolate = result.current;

    expect(interpolate(-10, 0, 0.5)).toBe(-5);
    expect(interpolate(-20, -10, 0.25)).toBe(-17.5);
  });

  it('should handle amount values outside the range [0, 1]', () => {
    const { result } = renderHook(() => useInterpolation());
    const interpolate = result.current;

    expect(interpolate(0, 10, -0.5)).toBe(-5);
    expect(interpolate(0, 10, 1.5)).toBe(15);
    expect(interpolate(-5, 5, 2)).toBe(15);
  });

  it('should return the same function on multiple renders', () => {
    const { result, rerender } = renderHook(() => useInterpolation());
    const interpolateFn = result.current;

    rerender();

    expect(result.current).toBe(interpolateFn);
  });
});
