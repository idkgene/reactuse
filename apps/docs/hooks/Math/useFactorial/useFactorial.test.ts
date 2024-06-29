import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFactorial } from './useFactorial';

describe('useFactorial', () => {
  it('should calculate the factorial correctly', () => {
    const { result } = renderHook(() => useFactorial());
    const factorial = result.current;

    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(10)).toBe(3628800);
  });

  it('should return null for negative numbers', () => {
    const { result } = renderHook(() => useFactorial());
    const factorial = result.current;

    expect(factorial(-1)).toBeNull();
    expect(factorial(-5)).toBeNull();
  });

  it('should return null for non-integer numbers', () => {
    const { result } = renderHook(() => useFactorial());
    const factorial = result.current;

    expect(factorial(1.5)).toBeNull();
    expect(factorial(3.14)).toBeNull();
  });

  it('should handle large numbers correctly', () => {
    const { result } = renderHook(() => useFactorial());
    const factorial = result.current;

    expect(factorial(20)).toBe(2432902008176640000);
  });

  it('should return the same function on multiple renders', () => {
    const { result, rerender } = renderHook(() => useFactorial());
    const factorialFn = result.current;

    rerender();

    expect(result.current).toBe(factorialFn);
  });
});
