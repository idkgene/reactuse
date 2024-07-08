import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { isResolvableNumber, useCeil } from '../use-ceil';

describe('useCeil', () => {
  it('should return the ceiling of a number', () => {
    const { result } = renderHook(() => useCeil(3.14));
    expect(result.current).toBe(4);
  });

  it('should return the same number for integers', () => {
    const { result } = renderHook(() => useCeil(5));
    expect(result.current).toBe(5);
  });

  it('should handle negative numbers', () => {
    const { result } = renderHook(() => useCeil(-3.14));
    expect(result.current).toBe(-3);
  });

  it('should handle zero', () => {
    const { result } = renderHook(() => useCeil(0));
    expect(result.current).toBe(0);
  });

  it('should handle function that returns a number', () => {
    const { result } = renderHook(() => useCeil(() => 3.14));
    expect(result.current).toBe(4);
  });

  it('should throw an error for NaN', () => {
    expect(() => {
      renderHook(() => useCeil(NaN));
    }).toThrow('Input must be a valid number');
  });

  it('should throw an error for non-number values', () => {
    expect(() => {
      renderHook(() => useCeil('not a number' as unknown as never));
    }).toThrow('Input must be a valid number');
  });
});

describe('isResolvableNumber', () => {
  it('should return true for numbers', () => {
    expect(isResolvableNumber(5)).toBe(true);
    expect(isResolvableNumber(3.14)).toBe(true);
    expect(isResolvableNumber(-2)).toBe(true);
    expect(isResolvableNumber(0)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(isResolvableNumber(NaN)).toBe(false);
  });

  it('should return true for functions that return numbers', () => {
    expect(isResolvableNumber(() => 5)).toBe(true);
  });

  it('should return false for functions that return non-numbers', () => {
    expect(isResolvableNumber(() => 'not a number')).toBe(false);
  });

  it('should return false for functions that throw errors', () => {
    expect(
      isResolvableNumber(() => {
        throw new Error('Test error');
      }),
    ).toBe(false);
  });

  it('should return false for non-number, non-function values', () => {
    expect(isResolvableNumber('string')).toBe(false);
    expect(isResolvableNumber(true)).toBe(false);
    expect(isResolvableNumber(null)).toBe(false);
    expect(isResolvableNumber(undefined)).toBe(false);
    expect(isResolvableNumber({})).toBe(false);
    expect(isResolvableNumber([])).toBe(false);
  });
});
