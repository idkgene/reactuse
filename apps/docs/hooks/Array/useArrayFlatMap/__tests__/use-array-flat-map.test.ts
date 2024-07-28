import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useArrayFlatMap } from '../use-array-flat-map';

describe('useArrayFlatMap', () => {
  describe('basic functionality', () => {
    it('should correctly flatten and map a basic array', () => {
      const { result } = renderHook(() =>
        useArrayFlatMap([1, 2, 3], (x) => [x, x * 2]),
      );
      expect(result.current).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it('should work with a function returning an array', () => {
      const { result } = renderHook(() =>
        useArrayFlatMap(
          () => [1, 2, 3],
          (x) => [x, x * 2],
        ),
      );
      expect(result.current).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it('should properly flatten nested arrays', () => {
      const { result } = renderHook(() =>
        useArrayFlatMap([1, 2, 3], (x) => [[x], [x * 2]]),
      );
      expect(result.current).toEqual([[1], [2], [2], [4], [3], [6]]);
    });

    it('should handle empty arrays', () => {
      const { result } = renderHook(() =>
        useArrayFlatMap([], (x) => [x, x * 2]),
      );
      expect(result.current).toEqual([]);
    });
  });

  describe('error handling', () => {
    it('should throw an error when the first argument is not an array or function', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        // noop
      });
      expect(() => {
        renderHook(() =>
          useArrayFlatMap(42 as unknown as never, (x: number) => [x, x * 2]),
        );
      }).toThrow(
        'The first argument must be an array or a function returning an array',
      );
      consoleSpy.mockRestore();
    });

    it('should throw an error when the second argument is not a function', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        // noop
      });
      expect(() => {
        renderHook(() =>
          useArrayFlatMap([1, 2, 3], 'not a function' as unknown as never),
        );
      }).toThrow('The second argument must be a function');
      consoleSpy.mockRestore();
    });
  });

  describe('memoization', () => {
    it('should update the result when inputs change', () => {
      const { result, rerender } = renderHook(
        ({ array, callback }) => useArrayFlatMap(array, callback),
        {
          initialProps: {
            array: [1, 2, 3],
            callback: (x: number) => [x, x * 2],
          },
        },
      );

      const initialResult = result.current;
      rerender({ array: [2, 3, 4], callback: (x: number) => [x, x * 2] });
      expect(result.current).not.toBe(initialResult);
      expect(result.current).toEqual([2, 4, 3, 6, 4, 8]);
    });
  });
});
