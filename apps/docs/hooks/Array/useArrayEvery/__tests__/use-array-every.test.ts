import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useArrayEvery } from '../use-array-every';

describe('useArrayEvery', () => {
  it('should return true for an empty array', () => {
    const { result } = renderHook(() => useArrayEvery([], () => true));
    expect(result.current).toBe(true);
  });

  it('should return true if all elements satisfy the predicate', () => {
    const numbers = [2, 4, 6, 8, 10];
    const predicate = (num: number) => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(numbers, predicate));
    expect(result.current).toBe(true);
  });

  it('should return false if any element does not satisfy the predicate', () => {
    const numbers = [2, 4, 6, 7, 8, 10];
    const predicate = (num: number) => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(numbers, predicate));
    expect(result.current).toBe(false);
  });

  it('should handle non-array input', () => {
    const nonArray = null;
    const predicate = (num: number) => num % 2 === 0;
    const { result } = renderHook(() =>
      useArrayEvery(nonArray as any, predicate),
    );
    expect(result.current).toBe(false);
  });

  it('should handle non-function predicate gracefully', () => {
    const numbers = [2, 4, 6, 8, 10];
    const nonFunctionPredicate = null;
    const { result } = renderHook(() =>
      useArrayEvery(numbers, nonFunctionPredicate as any),
    );
    expect(result.current).toBe(false);
  });

  it('should memoize the result based on list and predicate', () => {
    const numbers = [2, 4, 6, 8, 10];
    const predicate = (num: number) => num % 2 === 0;
    const { result, rerender } = renderHook(
      ({ list, predicate }) => useArrayEvery(list, predicate),
      {
        initialProps: { list: numbers, predicate },
      },
    );

    expect(result.current).toBe(true);

    rerender({ list: numbers, predicate });
    expect(result.current).toBe(true);

    rerender({ list: [...numbers, 11], predicate });
    expect(result.current).toBe(false);

    rerender({ list: numbers, predicate: (num: number) => num < 10 });
    expect(result.current).toBe(false);
  });

  it('should handle large arrays efficiently', () => {
    const largeArray = Array.from({ length: 1000000 }, (_, index) => index);
    const predicate = (num: number) => num < 1000000;
    const { result } = renderHook(() => useArrayEvery(largeArray, predicate));
    expect(result.current).toBe(true);
  });
});
