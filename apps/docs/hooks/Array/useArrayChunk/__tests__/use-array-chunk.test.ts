import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useArrayChunk } from '../use-array-chunk';

describe('useArrayChunk', () => {
  describe('basic functionality', () => {
    it('should chunk a simple array input', () => {
      const { result } = renderHook(() => useArrayChunk([1, 2, 3, 4, 5], 2));
      expect(result.current).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should chunk the result of a function returning an array', () => {
      const { result } = renderHook(() =>
        useArrayChunk(() => [1, 2, 3, 4, 5], 2),
      );
      expect(result.current).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should chunk with different sizes', () => {
      const { result: result1 } = renderHook(() =>
        useArrayChunk([1, 2, 3, 4, 5], 1),
      );
      expect(result1.current).toEqual([[1], [2], [3], [4], [5]]);

      const { result: result3 } = renderHook(() =>
        useArrayChunk([1, 2, 3, 4, 5], 3),
      );
      expect(result3.current).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);
    });
  });

  describe('edge cases', () => {
    it('should handle an empty array', () => {
      const { result } = renderHook(() => useArrayChunk([], 2));
      expect(result.current).toEqual([]);
    });

    it('should handle chunk size larget that array length', () => {
      const { result } = renderHook(() => useArrayChunk([1, 2, 3], 5));
      expect(result.current).toEqual([[1, 2, 3]]);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-array input', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      expect(() => {
        renderHook(() =>
          useArrayChunk('not an array' as unknown as string[], 2),
        );
      }).toThrow(
        'The first argument must be an array or a function returning an array',
      );

      consoleErrorSpy.mockRestore();
    });

    it('should throw error for invalid chunk size', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      expect(() => {
        renderHook(() => useArrayChunk([1, 2, 3], 0));
      }).toThrow('Chunk size must be a positive integer');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('memoization', () => {
    it('should return the same result for identical inputs', () => {
      const { result, rerender } = renderHook(
        ({ array, size }: { array: number[]; size: number }) =>
          useArrayChunk(array, size),
        { initialProps: { array: [1, 2, 3, 4, 5], size: 2 } },
      );

      const initialResult = result.current;
      rerender({ array: [1, 2, 3, 4, 5], size: 2 });
      expect(result.current).toEqual(initialResult);
    });

    it('should update when inputs change', () => {
      const { result, rerender } = renderHook(
        ({ array, size }) => useArrayChunk(array, size),
        { initialProps: { array: [1, 2, 3, 4, 5], size: 2 } },
      );

      const initialResult = result.current;
      rerender({ array: [1, 2, 3, 4, 5], size: 3 });
      expect(result.current).not.toBe(initialResult);
      expect(result.current).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);

      rerender({ array: [6, 7, 8, 9, 10], size: 3 });
      expect(result.current).not.toBe(initialResult);
      expect(result.current).toEqual([
        [6, 7, 8],
        [9, 10],
      ]);
    });

    it('should memoize the getter function', () => {
      const mockGetter = vi.fn(() => [1, 2, 3, 4, 5]);
      const { rerender } = renderHook(() => useArrayChunk(mockGetter, 2));

      expect(mockGetter).toHaveBeenCalledTimes(1);
      rerender();
      expect(mockGetter).toHaveBeenCalledTimes(1);
    });
  });
});
