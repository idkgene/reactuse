import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProjection, type ProjectorFunction } from '../use-projection';

describe('useProjection', () => {
  it('should project a value correctly with default projector', () => {
    const { result } = renderHook(() => useProjection(50, [0, 100], [0, 1]));
    expect(result.current).toBeCloseTo(0.5);
  });

  it('should handle different number types', () => {
    const { result } = renderHook(() =>
      useProjection<number, number>(50, [0, 100], [0, 1000]),
    );
    expect(result.current).toBe(500);
  });

  it('should work with function inputs', () => {
    const { result } = renderHook(() =>
      useProjection(
        () => 50,
        () => [0, 100],
        () => [0, 1],
      ),
    );
    expect(result.current).toBeCloseTo(0.5);
  });

  it('should throw error for invalid input domain', () => {
    expect(() => {
      renderHook(() => useProjection(50, [100, 0], [0, 1]));
    }).toThrow('Invalid input domain: min must be less than max');
  });

  it('should throw error for invalid output domain', () => {
    expect(() => {
      renderHook(() => useProjection(50, [0, 100], [1, 0]));
    }).toThrow('Invalid output domain: min must be less than max');
  });

  it('should throw error for input value outside domain', () => {
    expect(() => {
      renderHook(() => useProjection(150, [0, 100], [0, 1]));
    }).toThrow('Input value 150 is outside the input domain [0, 100]');
  });

  it('should use custom projector function', () => {
    const customProjector: ProjectorFunction<number, number> = (value) => {
      return value;
    };
    const { result } = renderHook(() =>
      useProjection(50, [0, 100], [0, 1], customProjector),
    );
    expect(result.current).toBe(50);
  });

  it('should handle edge cases', () => {
    const { result: minResult } = renderHook(() =>
      useProjection(0, [0, 100], [0, 1]),
    );
    expect(minResult.current).toBe(0);

    const { result: maxResult } = renderHook(() =>
      useProjection(100, [0, 100], [0, 1]),
    );
    expect(maxResult.current).toBe(1);
  });

  it('should handle negative numbers', () => {
    const { result } = renderHook(() => useProjection(0, [-100, 100], [-1, 1]));
    expect(result.current).toBe(0);
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(
      ({ input }) => useProjection(input, [0, 100], [0, 1]),
      { initialProps: { input: 50 } },
    );
    const initialValue = result.current;
    rerender({ input: 50 });
    expect(result.current).toBe(initialValue);
  });
});
