import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGCD } from './use-gcd';

describe('useGCD', () => {
  it('should calculate the correct GCD for positive integers', () => {
    const { result } = renderHook(() => useGCD());
    const gcd = result.current;

    expect(gcd(8, 12)).toBe(4);
    expect(gcd(17, 23)).toBe(1);
    expect(gcd(24, 36)).toBe(12);
  });

  it('should calculate the correct GCD for negative integers', () => {
    const { result } = renderHook(() => useGCD());
    const gcd = result.current;

    expect(gcd(-8, 12)).toBe(4);
    expect(gcd(17, -23)).toBe(1);
    expect(gcd(-24, -36)).toBe(12);
  });

  it('should calculate the correct GCD when one number is zero', () => {
    const { result } = renderHook(() => useGCD());
    const gcd = result.current;

    expect(gcd(0, 12)).toBe(12);
    expect(gcd(17, 0)).toBe(17);
  });

  it('should return null for non-integer numbers', () => {
    const { result } = renderHook(() => useGCD());
    const gcd = result.current;

    expect(gcd(1.5, 3)).toBeNull();
    expect(gcd(4, 2.7)).toBeNull();
  });

  it('should handle large numbers correctly', () => {
    const { result } = renderHook(() => useGCD());
    const gcd = result.current;

    expect(gcd(1234567890, 987654321)).toBe(9);
  });

  it('should return the same function on multiple renders', () => {
    const { result, rerender } = renderHook(() => useGCD());
    const gcdFn = result.current;

    rerender();

    expect(result.current).toBe(gcdFn);
  });
});
