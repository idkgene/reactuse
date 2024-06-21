import { renderHook } from '@testing-library/react';
import { useMax } from '../useMax';

describe('useMax', () => {
  it('should return the maximum value from an array', () => {
    const { result } = renderHook(() => useMax([1, 2, 3, 4]));
    expect(result.current).toBe(4);
  });

  it('should return the maximum value from multiple arguments', () => {
    const { result } = renderHook(() => useMax(1, 3, 2));
    expect(result.current).toBe(3);
  });

  it('should handle an empty array', () => {
    const { result } = renderHook(() => useMax([]));
    expect(result.current).toBe(-Infinity);
  });

  it('should handle no arguments', () => {
    const { result } = renderHook(() => useMax());
    expect(result.current).toBe(-Infinity);
  });

  it('should handle a single argument', () => {
    const { result } = renderHook(() => useMax(5));
    expect(result.current).toBe(5);
  });

  it('should handle a mix of direct values and getter functions', () => {
    const value1 = 10;
    const value2 = () => 20;
    const value3 = () => 15;

    const { result } = renderHook(() => useMax(value1, value2, value3));
    expect(result.current).toBe(20);
  });

  it('should handle an array of direct values and getter functions', () => {
    const value1 = 10;
    const value2 = () => 20;
    const value3 = () => 15;

    const { result } = renderHook(() => useMax([value1, value2, value3]));
    expect(result.current).toBe(20);
  });

  it('should memoize the result and only recompute when dependencies change', () => {
    const value1 = 10;
    const value2 = () => 20;

    const { result, rerender } = renderHook(
      ({ value1, value2 }) => useMax(value1, value2),
      {
        initialProps: { value1, value2 },
      }
    );

    expect(result.current).toBe(20);

    rerender({ value1, value2 });
    expect(result.current).toBe(20);

    rerender({ value1: 30, value2 });
    expect(result.current).toBe(30);
  });
});
