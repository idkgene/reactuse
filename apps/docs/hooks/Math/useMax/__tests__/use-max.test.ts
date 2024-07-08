import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMax } from '../use-max';

describe('useMax', () => {
  it('should return the maximum of given numbers', () => {
    const { result } = renderHook(() => useMax(1, 2, 3));
    expect(result.current).toBe(3);
  });

  it('should work with a single array argument', () => {
    const { result } = renderHook(() => useMax([1, 2, 3]));
    expect(result.current).toBe(3);
  });

  it('should work with negative numbers', () => {
    const { result } = renderHook(() => useMax(-1, -2, -3));
    expect(result.current).toBe(-1);
  });

  it('should work with functions returning numbers', () => {
    const { result } = renderHook(() =>
      useMax(
        () => 1,
        () => 2,
        () => 3,
      ),
    );
    expect(result.current).toBe(3);
  });

  it('should work with a mix of numbers and functions', () => {
    const { result } = renderHook(() => useMax(1, () => 2, 3));
    expect(result.current).toBe(3);
  });

  it('should work with a single number', () => {
    const { result } = renderHook(() => useMax(5));
    expect(result.current).toBe(5);
  });

  it('should throw an error when no arguments are provided', () => {
    expect(() => renderHook(() => useMax())).toThrow(
      'useMax: At least one argument is required',
    );
  });

  it('should throw an error when an empty array is provided', () => {
    expect(() => renderHook(() => useMax([]))).toThrow(
      'useMax: Empty array provided',
    );
  });

  it('should throw an error when non-number values are provided', () => {
    const invalidInput = [1, 2, '3'];
    expect(() =>
      renderHook(() => useMax(...(invalidInput as unknown as number[]))),
    ).toThrowError('useMax: All resolved values must be numbers');
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(({ values }) => useMax(...values), {
      initialProps: { values: [1, 2, 3] },
    });

    expect(result.current).toBe(3);

    rerender({ values: [1, 2, 3] });
    expect(result.current).toBe(3);

    rerender({ values: [1, 2, 3] });
    expect(result.current).toBe(3);
  });

  it('should update when dependencies change', () => {
    const { result, rerender } = renderHook(({ values }) => useMax(...values), {
      initialProps: { values: [1, 2, 3] },
    });

    expect(result.current).toBe(3);

    rerender({ values: [4, 5, 6] });
    expect(result.current).toBe(6);
  });

  it('should handle floating point numbers correctly', () => {
    const { result } = renderHook(() => useMax(1.1, 1.2, 1.3));
    expect(result.current).toBe(1.3);
  });

  it('should handle very large numbers', () => {
    const { result } = renderHook(() =>
      useMax(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1),
    );
    expect(result.current).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle Infinity', () => {
    const { result } = renderHook(() => useMax(1, 2, Infinity));
    expect(result.current).toBe(Infinity);
  });
});
