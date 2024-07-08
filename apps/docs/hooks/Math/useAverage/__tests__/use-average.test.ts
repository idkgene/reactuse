import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useAverage } from '../use-average';

describe('useAverage', () => {
  it('should calculate average of positive numbers', () => {
    const { result } = renderHook(() => useAverage(1, 2, 3, 4, 5));
    expect(result.current).toBe(3);
  });

  it('should calculate average of negative numbers', () => {
    const { result } = renderHook(() => useAverage(-1, -2, -3, -4, -5));
    expect(result.current).toBe(-3);
  });

  it('should calculate average of mixed positive and negative numbers', () => {
    const { result } = renderHook(() => useAverage(-2, -1, 0, 1, 2));
    expect(result.current).toBe(0);
  });

  it('should handle a single number', () => {
    const { result } = renderHook(() => useAverage(5));
    expect(result.current).toBe(5);
  });

  it('should handle an array of numbers', () => {
    const { result } = renderHook(() => useAverage([1, 2, 3, 4, 5]));
    expect(result.current).toBe(3);
  });

  it('should handle functions returning numbers', () => {
    const { result } = renderHook(() =>
      useAverage(
        () => 1,
        () => 2,
        () => 3,
      ),
    );
    expect(result.current).toBe(2);
  });

  it('should handle mixed numbers and functions', () => {
    const { result } = renderHook(() => useAverage(1, () => 2, 3));
    expect(result.current).toBe(2);
  });

  it('should throw error for no arguments', () => {
    expect(() => {
      renderHook(() => useAverage());
    }).toThrow('useAverage: At least one argument is required');
  });

  it('should throw error for empty array', () => {
    expect(() => {
      renderHook(() => useAverage([]));
    }).toThrow('useAverage: Cannot calculate average of an empty array');
  });

  it('should throw error for non-numeric values', () => {
    expect(() => {
      renderHook(() => useAverage(1, 2, 'three' as unknown as number));
    }).toThrow(
      'useAverage: Failed to resolve value at index 2: Invalid value at index 2',
    );
  });

  it('should throw error for functions returning non-numeric values', () => {
    expect(() => {
      renderHook(() => useAverage(1, 2, () => 'three' as unknown as number));
    }).toThrow(
      'useAverage: Failed to resolve value at index 2: Invalid value at index 2',
    );
  });

  it('should throw error for NaN values', () => {
    expect(() => {
      renderHook(() => useAverage(1, 2, NaN));
    }).toThrow(
      'useAverage: Failed to resolve value at index 2: Invalid value at index 2',
    );
  });

  it('should throw error for functions throwing errors', () => {
    const throwingFunction = (): never => {
      throw new Error('Test error');
    };
    expect(() => {
      renderHook(() => useAverage(1, 2, throwingFunction));
    }).toThrow('useAverage: Failed to resolve value at index 2: Test error');
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(
      ({ values }) => useAverage(...values),
      { initialProps: { values: [1, 2, 3] } },
    );
    const initialResult = result.current;
    rerender({ values: [1, 2, 3] });
    expect(result.current).toBe(initialResult);
  });
});
