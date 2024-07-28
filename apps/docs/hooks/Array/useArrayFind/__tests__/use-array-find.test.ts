import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useArrayFind } from '../use-array-find';

describe('useArrayFind', () => {
  describe('basic functionality', () => {
    it('should find an element in a simple array', () => {
      const { result } = renderHook(() =>
        useArrayFind([1, 2, 3, 4, 5], (num) => num > 3),
      );
      expect(result.current).toBe(4);
    });

    it('should work with a function that returns an array', () => {
      const { result } = renderHook(() =>
        useArrayFind(
          () => [1, 2, 3, 4, 5],
          (num) => num > 3,
        ),
      );
      expect(result.current).toBe(4);
    });

    it('should return undefined when no element is found', () => {
      const { result } = renderHook(() =>
        useArrayFind([1, 2, 3, 4, 5], (num) => num > 10),
      );
      expect(result.current).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for invalid input', () => {
      // @ts-expect-error Testing invalid input
      expect(() => renderHook(() => useArrayFind(123, () => true))).toThrow(
        TypeError,
      );
    });
  });

  describe('memoization', () => {
    it('should re-compute when dependencies change', () => {
      const { result, rerender } = renderHook(
        ({ threshold }) =>
          useArrayFind([1, 2, 3, 4, 5], (num) => num > threshold, [threshold]),
        { initialProps: { threshold: 3 } },
      );

      expect(result.current).toBe(4);

      rerender({ threshold: 4 });

      expect(result.current).toBe(5);
    });
  });

  describe('more complex data structures', () => {
    it('should work with an array of objects', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const { result } = renderHook(() =>
        useArrayFind(users, (user) => user.name === 'Bob'),
      );
      expect(result.current).toEqual({ id: 2, name: 'Bob' });
    });

    it('should work with nested arrays', () => {
      const nestedArray = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const { result } = renderHook(() =>
        useArrayFind(nestedArray, (subArray) => subArray.includes(4)),
      );
      expect(result.current).toEqual([3, 4]);
    });
  });

  describe('edge cases', () => {
    it('should handle an empty array', () => {
      const { result } = renderHook(() => {
        useArrayFind([], () => true);
      });
      expect(result.current).toBeUndefined();
    });
  });
});
