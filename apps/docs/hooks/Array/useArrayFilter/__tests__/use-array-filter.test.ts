import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayFilter } from '../use-array-filter';

describe('useArrayFilter', () => {
  describe('basic functionality', () => {
    it('should filter an array correctly', () => {
      const { result } = renderHook(() =>
        useArrayFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0),
      );
      expect(result.current).toEqual([2, 4]);
    });

    it('should handle empty arrays', () => {
      const { result } = renderHook(() => useArrayFilter([], () => true));
      expect(result.current).toEqual([]);
    });

    it('should work with a function returning an array', () => {
      const { result } = renderHook(() =>
        useArrayFilter(
          () => [1, 2, 3, 4, 5],
          (num) => num % 2 === 0,
        ),
      );
      expect(result.current).toEqual([2, 4]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when all elements are filtered out', () => {
      const { result } = renderHook(() =>
        useArrayFilter([1, 3, 5], (num) => num % 2 === 0),
      );
      expect(result.current).toEqual([]);
    });

    it('should return the original array when no elements are filtered out', () => {
      const original = [2, 4, 6];
      const { result } = renderHook(() =>
        useArrayFilter(original, (num) => num % 2 === 0),
      );
      expect(result.current).toEqual(original);
    });
  });

  describe('error handling', () => {
    it('should handle invalid input (non-array)', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const { result } = renderHook(() =>
        useArrayFilter(42 as unknown as never, () => true),
      );
      expect(result.current).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should handle a function returning a non-array', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const { result } = renderHook(() =>
        useArrayFilter(
          () => 42 as unknown as never,
          () => true,
        ),
      );
      expect(result.current).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('memoization tests', () => {
    it("should memoize the result when inputs don't change", () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = vi.fn((num: number) => num % 2 === 0);
      const { result, rerender } = renderHook(() =>
        useArrayFilter(array, predicate),
      );

      const firstResult = result.current;

      predicate.mockClear();

      rerender();

      expect(result.current).toBe(firstResult);
      expect(predicate).not.toHaveBeenCalled();
    });

    it('should update the result when the array changes', () => {
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result, rerender } = renderHook(
        ({ array }) => useArrayFilter(array, predicate),
        { initialProps: { array: [1, 2, 3, 4, 5] } },
      );

      expect(result.current).toEqual([2, 4]);
      rerender({ array: [1, 2, 3, 4, 5, 6] });
      expect(result.current).toEqual([2, 4, 6]);
    });

    it('should update the result when the predicate changes', () => {
      const array = [1, 2, 3, 4, 5];
      const { result, rerender } = renderHook(
        ({ predicate }) => useArrayFilter(array, predicate),
        { initialProps: { predicate: (num: number) => num % 2 === 0 } },
      );

      expect(result.current).toEqual([2, 4]);
      rerender({ predicate: (num: number) => num > 3 });
      expect(result.current).toEqual([4, 5]);
    });
  });
});
