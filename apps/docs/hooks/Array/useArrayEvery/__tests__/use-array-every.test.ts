import { type RenderHookResult, renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayEvery } from '../use-array-every';

type ArrayElement<T> = T extends (infer U)[] ? U : never;

type UseArrayEveryPredicate<T> = (
  element: T,
  index: number,
  array: readonly T[],
) => boolean;

const renderUseArrayEvery = <T>(
  list: readonly T[] | null | undefined,
  predicate: UseArrayEveryPredicate<ArrayElement<T>>,
): RenderHookResult<boolean, unknown> => {
  return renderHook(() => useArrayEvery(list, predicate));
};

describe('useArrayEvery', () => {
  describe('basic functionality', () => {
    it('should return true when all elements pass the predicate', () => {
      const list = [2, 4, 6, 8];
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });

    it('should return false when not all elements pass the predicate', () => {
      const list = [2, 4, 5, 8];
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(false);
    });

    it('should work with a single-element array', () => {
      const list = [3];
      const predicate = (num: number): boolean => num % 2 !== 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return true for an empty array', () => {
      const list: number[] = [];
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });

    it('should return true for null input', () => {
      const list = null;
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });

    it('should return true for undefined input', () => {
      const list = undefined;
      const predicate = (num: number): boolean => num % 2 === 0;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });
  });

  describe('predicate variations', () => {
    it('should work with a named function predicate', () => {
      const list = [2, 4, 6, 8];
      function isEven(num: number): boolean {
        return num % 2 === 0;
      }
      const { result } = renderUseArrayEvery(list, isEven);
      expect(result.current).toBe(true);
    });

    it('should work with an arrow function predicate', () => {
      const list = ['apple', 'banana', 'cherry'];
      const predicate: UseArrayEveryPredicate<string> = (fruit) =>
        fruit.length > 3;
      const { result } = renderUseArrayEvery(list, predicate);
      expect(result.current).toBe(true);
    });
  });

  describe('memoization', () => {
    it('should memoize results correctly', () => {
      const list = [2, 4, 6, 8];
      const predicate = vi.fn((num: number) => num % 2 === 0);
      const { result, rerender } = renderUseArrayEvery(list, predicate);

      expect(result.current).toBe(true);
      expect(predicate).toHaveBeenCalledTimes(4);

      rerender();
      expect(result.current).toBe(true);
      expect(predicate).toHaveBeenCalledTimes(4); // Predicate should not be called again
    });

    it('should update result when list changes', () => {
      const initialList = [2, 4, 6, 8];
      const predicate: UseArrayEveryPredicate<number> = (num) => num % 2 === 0;
      let currentList = initialList;
      const { result, rerender } = renderHook(() =>
        useArrayEvery(currentList, predicate),
      );

      expect(result.current).toBe(true);

      currentList = [2, 4, 5, 8];
      rerender();
      expect(result.current).toBe(false);
    });

    it('should update result when predicate changes', () => {
      const list = [2, 4, 6, 8];
      let currentPredicate: UseArrayEveryPredicate<number> = (num) =>
        num % 2 === 0;
      const { result, rerender } = renderHook(() =>
        useArrayEvery(list, currentPredicate),
      );

      expect(result.current).toBe(true);

      currentPredicate = (num) => num > 5;
      rerender();
      expect(result.current).toBe(false);
    });
  });
});
