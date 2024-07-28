import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useArrayIntersection } from '../use-array-intersection';

describe('useArrayIntersection', () => {
  describe('basic functionality', () => {
    it('should return te intersection of multiple arrays', () => {
      const { result } = renderHook(() =>
        useArrayIntersection([1, 2, 3], [2, 3, 4], [3, 4, 5]),
      );
      expect(result.current).toEqual([3]);
    });

    it('should return an empty array when there is no intersection', () => {
      const { result } = renderHook(() =>
        useArrayIntersection([1, 2, 3], [4, 5, 6]),
      );
      expect(result.current).toEqual([]);
    });

    it('should return the original array when only one array is provided', () => {
      const { result } = renderHook(() => useArrayIntersection([1, 2, 3]));
      expect(result.current).toEqual([1, 2, 3]);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      const { result } = renderHook(() =>
        useArrayIntersection([], [1, 2, 3], []),
      );
      expect(result.current).toEqual([]);
    });

    it('should return an empty array when no args are provided', () => {
      const { result } = renderHook(() => useArrayIntersection());
      expect(result.current).toEqual([]);
    });
  });

  describe('function arguments', () => {
    it('should work with a mix of array and function arguments', () => {
      const { result } = renderHook(() =>
        useArrayIntersection([1, 2, 3], () => [2, 3, 4], [3, 4, 5]),
      );
      expect(result.current).toEqual([3]);
    });

    it('should work with only function arguments', () => {
      const { result } = renderHook(() =>
        useArrayIntersection(
          () => [1, 2, 3],
          () => [2, 3, 4],
          () => [3, 4, 5],
        ),
      );
      expect(result.current).toEqual([3]);
    });
  });

  describe('error handling', () => {
    it('should throw an error for invalid arguments', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      expect(() =>
        renderHook(() =>
          useArrayIntersection([1, 2, 3], 'not an array' as unknown as never),
        ),
      ).toThrow('All arguments must be arrays or functions returning arrays');
      consoleErrorSpy.mockRestore();
    });
  });
});
