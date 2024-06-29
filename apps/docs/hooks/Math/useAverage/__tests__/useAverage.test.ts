import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useAverage } from '../useAverage';

describe('useAverage', () => {
  it('should calculate the average of an array of numbers', () => {
    const { result } = renderHook(() => useAverage([1, 2, 3]));
    expect(result.current).toBe(2);
  });

  it('should calculate the average of multiple number arguments', () => {
    const { result } = renderHook(() => useAverage(1, 2, 3));
    expect(result.current).toBe(2);
  });

  it('should work with getter functions', () => {
    const { result } = renderHook(() =>
      useAverage(
        () => 1,
        () => 2,
        () => 3,
      ),
    );
    expect(result.current).toBe(2);
  });

  it('should return NaN if the array is empty', () => {
    const { result } = renderHook(() => useAverage([]));
    expect(result.current).toBeNaN();
  });

  it('should memoize the result', () => {
    const arr = [1, 2, 3];
    const { result, rerender } = renderHook(({ arr }) => useAverage(arr), {
      initialProps: { arr },
    });

    expect(result.current).toBe(2);

    arr.push(4);
    rerender({ arr });

    expect(result.current).toBe(2.5);
  });
});
