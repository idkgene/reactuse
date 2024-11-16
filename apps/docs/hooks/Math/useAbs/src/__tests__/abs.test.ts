import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAbs } from '../abs';

describe('useAbs', () => {
  it('should return the same value for positive numbers', () => {
    const { result } = renderHook(() => useAbs(5));
    expect(result.current).toBe(5);
  });

  it('should handle zero correctly', () => {
    const { result } = renderHook(() => useAbs(0));
    expect(result.current).toBe(0);
  });

  it('should return positive value for negative numbers', () => {
    const { result } = renderHook(() => useAbs(-5));
    expect(result.current).toBe(5);
  });

  it('should handle negative zero correctly', () => {
    const { result } = renderHook(() => useAbs(-0));
    expect(result.current).toBe(0);
  });

  it('should handle very large numbers', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    const { result } = renderHook(() => useAbs(-largeNumber));
    expect(result.current).toBe(largeNumber);
  });

  it('should handle very small numbers', () => {
    const smallNumber = Number.MIN_SAFE_INTEGER;
    const { result } = renderHook(() => useAbs(smallNumber));
    expect(result.current).toBe(-smallNumber);
  });

  it('should throw error for NaN input', () => {
    expect(() => {
      renderHook(() => useAbs(NaN));
    }).toThrow('Invalid input: value must not be NaN');
  });

  it('should handle function input', () => {
    const { result } = renderHook(() => useAbs(() => -10));
    expect(typeof result.current).toBe('function');
    expect((result.current as () => number)()).toBe(10);
  });

  it('should handle changing values with function input', () => {
    let value = -5;
    const { result, rerender } = renderHook(() => useAbs(() => value));
    expect(typeof result.current).toBe('function');
    expect((result.current as () => number)()).toBe(5);

    value = 8;
    rerender();
    expect((result.current as () => number)()).toBe(8);
  });
});
