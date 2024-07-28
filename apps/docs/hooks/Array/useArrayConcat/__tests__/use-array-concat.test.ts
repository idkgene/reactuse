import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useArrayConcat } from '../use-array-concat';

describe('useArrayConcat', () => {
  describe('basic functionality', () => {
    it('should concatenate multiple arrays', () => {
      const { result } = renderHook(() =>
        useArrayConcat([1, 2], [3, 4], [5, 6]),
      );
      expect(result.current).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should concatenate arrays and functions returning arrays', () => {
      const { result } = renderHook(() =>
        useArrayConcat([1, 2], () => [3, 4], [5, 6]),
      );
      expect(result.current).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should work with empty arrays and empty input', () => {
      const { result } = renderHook(() => useArrayConcat([], [], []));
      expect(result.current).toEqual([]);
    });
  });

  describe('error handling', () => {
    it('should throw an error when a non-array is provided', () => {
      // @ts-expect-error: Testing  runtime error for non-array input
      expect(() => renderHook(() => useArrayConcat([1, 2], 3, [4, 5]))).toThrow(
        'All arguments must be arrays or functions returning arrays',
      );
    });
  });
});
