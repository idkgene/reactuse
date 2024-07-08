import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFactorial } from '../use-factorial';

describe('useFactorial', () => {
  it('should calculate factorial for 0', () => {
    const { result } = renderHook(() => useFactorial());
    expect(result.current(0)).toBe(1n);
  });

  it('should calculate factorial for positive integers', () => {
    const { result } = renderHook(() => useFactorial());
    expect(result.current(5)).toBe(120n);
    expect(result.current(10)).toBe(3628800n);
  });

  it('should handle large factorials', () => {
    const { result } = renderHook(() => useFactorial());
    expect(result.current(20)).toBe(2432902008176640000n);
  });

  it('should throw an error for non-integer inputs', () => {
    const { result } = renderHook(() => useFactorial());
    expect(() => result.current(3.14)).toThrow(
      'Factorial is only defined for integers',
    );
  });

  it('should throw an error for negative inputs', () => {
    const { result } = renderHook(() => useFactorial());
    expect(() => result.current(-1)).toThrow(
      'Factorial is only defined for non-negative integers',
    );
  });

  it('should throw an error for inputs exceeding MAX_SAFE_INTEGER', () => {
    const { result } = renderHook(() => useFactorial());
    expect(() => result.current(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      'Input exceeds maximum safe integer',
    );
  });

  it('should return the same function reference on multiple renders', () => {
    const { result, rerender } = renderHook(() => useFactorial());
    const firstRender = result.current;
    rerender();
    expect(result.current).toBe(firstRender);
  });

  it('should handle factorial of 1', () => {
    const { result } = renderHook(() => useFactorial());
    expect(result.current(1)).toBe(1n);
  });
});
