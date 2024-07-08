import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { usePrecision } from '../use-precision';

describe('usePrecision', () => {
  it('should format number with given precision', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 2, value: 3.14159 }),
    );
    expect(result.current).toBe(3.14);
  });

  it('should handle zero precision', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 0, value: 3.14159 }),
    );
    expect(result.current).toBe(3);
  });

  it('should handle high precision', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 10, value: 1 / 3 }),
    );
    expect(result.current).toBe(0.3333333333);
  });

  it('should return NaN for invalid precision', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
    
    const { result } = renderHook(() =>
      usePrecision({ precision: -1, value: 3.14 }),
    );
    
    expect(result.current).toBe(NaN);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should return NaN for invalid value', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });

    const { result } = renderHook(() =>
      usePrecision({ precision: 2, value: NaN }),
    );
    
    expect(result.current).toBe(NaN);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle very large numbers', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 2, value: 1e20 }),
    );
    expect(result.current).toBe(1e20);
  });

  it('should handle very small numbers', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 20, value: 1e-18 }),
    );
    expect(result.current).toBe(1e-18);
  });

  it('should memoize result for same inputs', () => {
    const { result, rerender } = renderHook(
      ({ precision, value }) => usePrecision({ precision, value }),
      { initialProps: { precision: 2, value: 3.14159 } },
    );

    const initialResult = result.current;
    rerender({ precision: 2, value: 3.14159 });
    expect(result.current).toBe(initialResult);
  });

  it('should update result when inputs change', () => {
    const { result, rerender } = renderHook(
      ({ precision, value }) => usePrecision({ precision, value }),
      { initialProps: { precision: 2, value: 3.14159 } },
    );

    const initialResult = result.current;
    rerender({ precision: 3, value: 3.14159 });
    expect(result.current).not.toBe(initialResult);
    expect(result.current).toBe(3.142);
  });

  it('should handle precision of 0', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 0, value: 3.9 }),
    );
    expect(result.current).toBe(4);
  });

  it('should handle negative numbers', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 2, value: -3.14159 }),
    );
    expect(result.current).toBe(-3.14);
  });

  it('should handle zero', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 5, value: 0 }),
    );
    expect(result.current).toBe(0);
  });

  it('should handle Infinity', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
    const { result } = renderHook(() =>
      usePrecision({ precision: 2, value: Infinity }),
    );
    expect(result.current).toBe(NaN);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle very high precision', () => {
    const { result } = renderHook(() =>
      usePrecision({ precision: 100, value: Math.PI }),
    );
    expect(result.current).toBeCloseTo(Math.PI, 15); // JavaScript's Number precision limit
  });

  it('should handle changing precision', () => {
    const { result, rerender } = renderHook(
      ({ precision, value }) => usePrecision({ precision, value }),
      { initialProps: { precision: 2, value: Math.PI } },
    );

    expect(result.current).toBe(3.14);

    rerender({ precision: 4, value: Math.PI });
    expect(result.current).toBe(3.1416);

    rerender({ precision: 0, value: Math.PI });
    expect(result.current).toBe(3);
  });

  it('should handle changing value', () => {
    const { result, rerender } = renderHook(
      ({ precision, value }) => usePrecision({ precision, value }),
      { initialProps: { precision: 2, value: 3.14159 } },
    );

    expect(result.current).toBe(3.14);

    rerender({ precision: 2, value: 2.71828 });
    expect(result.current).toBe(2.72);
  });
});
