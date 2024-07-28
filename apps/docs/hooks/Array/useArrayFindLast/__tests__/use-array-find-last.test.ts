import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayFindLast } from '../use-array-find-last';

describe('useArrayFindLast', () => {
  describe('basic functionality', () => {
    it('should find the last element that satisfies the predicate', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBe(4);
    });

    it('should return undefined if no element satisfies the predicate', () => {
      const array = [1, 3, 5, 7, 9];
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBeUndefined();
    });

    it('should work with an empty array', () => {
      const array: number[] = [];
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBeUndefined();
    });

    it('should work with a function returning an array', () => {
      const arrayFn = (): number[] => [1, 2, 3, 4, 5];
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result } = renderHook(() => useArrayFindLast(arrayFn, predicate));

      expect(result.current).toBe(4);
    });

    it('should work with arrays of objects', () => {
      const array = [
        { id: 1, value: 'a' },
        { id: 2, value: 'b' },
        { id: 3, value: 'c' },
      ];
      const predicate = (obj: { id: number; value: string }): boolean =>
        obj.id > 1;

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toEqual({ id: 3, value: 'c' });
    });

    it('should handle arrays with different types', () => {
      const array: (number | string)[] = [1, 'two', 3, 'four', 5];
      const predicate = (item: number | string): boolean =>
        typeof item === 'string';

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBe('four');
    });

    it('should work with readonly arrays', () => {
      const array: readonly number[] = [1, 2, 3, 4, 5] as const;
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBe(4);
    });
  });

  describe('error handling', () => {
    it('should throw a TypeError if input is not an array or function', () => {
      const invalidInput = 'not an array' as unknown as never;
      const predicate = (str: string): boolean => str.length > 3;

      expect(() => {
        renderHook(() => useArrayFindLast(invalidInput, predicate));
      }).toThrow(TypeError);
    });

    it('should handle errors in the predicate function', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = vi.fn((num: number): boolean => {
        if (num === 4) {
          throw new Error('Test error');
        }
        return num % 2 === 0;
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        // noop
      });

      const { result } = renderHook(() => useArrayFindLast(array, predicate));

      expect(result.current).toBe(2);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in predicate for element at index 3:',
        expect.any(Error),
      );
      expect(predicate).toHaveBeenCalledTimes(4);

      consoleSpy.mockRestore();
    });

    it('should throw a TypeError when function returns a non-array value', () => {
      const nonArrayFn = (): number => 42;
      const predicate = (num: number): boolean => num % 2 === 0;

      expect(() => {
        renderHook(() =>
          useArrayFindLast(nonArrayFn as unknown as never, predicate),
        );
      }).toThrow(TypeError);
    });
  });

  describe('memoization', () => {
    it('should memoize the result', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = vi.fn((num: number) => num % 2 === 0);

      const { result, rerender } = renderHook(
        ({ arr, pred }) => useArrayFindLast(arr, pred),
        { initialProps: { arr: array, pred: predicate } },
      );

      expect(result.current).toBe(4);
      expect(predicate).toHaveBeenCalledTimes(2);

      rerender({ arr: array, pred: predicate });

      expect(result.current).toBe(4);
      expect(predicate).toHaveBeenCalledTimes(2);
    });

    it('should update result when array changes', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const updatedArray = [1, 3, 5, 7, 8];
      const predicate = (num: number): boolean => num % 2 === 0;

      const { result, rerender } = renderHook(
        ({ arr }) => useArrayFindLast(arr, predicate),
        { initialProps: { arr: initialArray } },
      );

      expect(result.current).toBe(4);

      rerender({ arr: updatedArray });

      expect(result.current).toBe(8);
    });

    it('should update result when predicate changes', () => {
      const array = [1, 2, 3, 4, 5];
      const initialPredicate = (num: number): boolean => num % 2 === 0;
      const updatedPredicate = (num: number): boolean => num % 2 !== 0;

      const { result, rerender } = renderHook(
        ({ pred }) => useArrayFindLast(array, pred),
        { initialProps: { pred: initialPredicate } },
      );

      expect(result.current).toBe(4);

      rerender({ pred: updatedPredicate });

      expect(result.current).toBe(5);
    });
  });
});
