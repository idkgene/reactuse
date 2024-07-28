import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayIncludes } from '../use-array-includes';

describe('useArrayIncludes', () => {
  describe('basic functionality', () => {
    it('should return false for null or undefined list', () => {
      const { result } = renderHook(() => useArrayIncludes(null, 1));
      expect(result.current).toBe(false);

      const { result: result2 } = renderHook(() =>
        useArrayIncludes(undefined, 1),
      );
      expect(result2.current).toBe(false);
    });

    it('should return false for empty list', () => {
      const { result } = renderHook(() => useArrayIncludes([], 1));
      expect(result.current).toBe(false);
    });

    it('should return true if value is in the list', () => {
      const { result } = renderHook(() => useArrayIncludes([1, 2, 3], 2));
      expect(result.current).toBe(true);
    });

    it('should return false if value is not in the list', () => {
      const { result } = renderHook(() => useArrayIncludes([1, 2, 3], 4));
      expect(result.current).toBe(false);
    });

    it('should use fromIndex option correctly', () => {
      const { result } = renderHook(() =>
        useArrayIncludes([1, 2, 3, 2], 2, { fromIndex: 2 }),
      );
      expect(result.current).toBe(true);

      const { result: result2 } = renderHook(() =>
        useArrayIncludes([1, 2, 3, 2], 2, { fromIndex: 3 }),
      );
      expect(result2.current).toBe(true);

      const { result: result3 } = renderHook(() =>
        useArrayIncludes([1, 2, 3, 2], 2, { fromIndex: 4 }),
      );
      expect(result3.current).toBe(false);
    });

    it('should use function comparator correctly', () => {
      const comparator = (element: number, value: number): boolean =>
        element > value;
      const { result } = renderHook(() =>
        useArrayIncludes([1, 2, 3], 2, { comparator }),
      );
      expect(result.current).toBe(true);
    });

    it('should use string comparator correctly for object arrays', () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const { result } = renderHook(() =>
        useArrayIncludes(list, 2, { comparator: 'id' }),
      );
      expect(result.current).toBe(true);
    });

    it('should work with different types', () => {
      const { result: resultString } = renderHook(() =>
        useArrayIncludes(['a', 'b', 'c'], 'b'),
      );
      expect(resultString.current).toBe(true);

      const { result: resultObject } = renderHook(() =>
        useArrayIncludes(
          [{ id: 1 }, { id: 2 }],
          { id: 2 },
          {
            comparator: (a, b) => a.id === b.id,
          },
        ),
      );
      expect(resultObject.current).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle invalid fromIndex', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        // noop
      });
      const { result } = renderHook(() =>
        useArrayIncludes([1, 2, 3], 2, { fromIndex: -1 }),
      );
      expect(result.current).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'useArrayIncludes: Invalid fromIndex',
      );
      consoleSpy.mockRestore();
    });

    it('should handle non-object elements with string comparator', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        // noop
      });
      const list = [1, 2, 3] as unknown as never;
      const { result } = renderHook(() =>
        useArrayIncludes(list, 2, { comparator: 'id' }),
      );
      expect(result.current).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'useArrayIncludes: Element is not an object',
      );
      consoleSpy.mockRestore();
    });

    it('should warn when list is not an array', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // noop
      });
      const { result } = renderHook(() =>
        useArrayIncludes({} as unknown as never, 1),
      );
      expect(result.current).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'useArrayIncludes: list is not an array',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('memoization', () => {
    it('should memoize the result', () => {
      const initialList = [1, 2, 3];
      const { result, rerender } = renderHook(
        ({ currentList, value }) => useArrayIncludes(currentList, value),
        { initialProps: { currentList: initialList, value: 2 } },
      );

      expect(result.current).toBe(true);

      rerender({ currentList: initialList, value: 2 });
      expect(result.current).toBe(true);

      rerender({ currentList: [...initialList], value: 2 });
      expect(result.current).toBe(true);
    });

    it('should update result when list changes', () => {
      const { result, rerender } = renderHook(
        ({ list, value }) => useArrayIncludes(list, value),
        { initialProps: { list: [1, 2, 3], value: 4 } },
      );

      expect(result.current).toBe(false);

      rerender({ list: [1, 2, 3, 4], value: 4 });
      expect(result.current).toBe(true);
    });

    it('should update result when value changes', () => {
      const { result, rerender } = renderHook(
        ({ list, value }) => useArrayIncludes(list, value),
        { initialProps: { list: [1, 2, 3], value: 3 } },
      );

      expect(result.current).toBe(true);

      rerender({ list: [1, 2, 3], value: 4 });
      expect(result.current).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined options', () => {
      const { result } = renderHook(() =>
        useArrayIncludes([1, 2, 3], 2, undefined),
      );
      expect(result.current).toBe(true);
    });

    it('should handle partial options', () => {
      const { result } = renderHook(() =>
        useArrayIncludes([1, 2, 3], 2, { fromIndex: 1 }),
      );
      expect(result.current).toBe(true);
    });
  });
});
