import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import {
  useArrayDifference,
} from '../use-array-difference';

type KeySelector<T> = (item: T) => unknown;
type Comparator<T> = (a: T, b: T) => boolean;

describe('useArrayDifference', () => {
  describe('basic functionality', () => {
    it('should return the difference between two arrays', () => {
      const { result } = renderHook(() =>
        useArrayDifference([1, 2, 3, 4, 5], [2, 4]),
      );
      expect(result.current).toEqual([1, 3, 5]);
    });

    it('should return an empty array when inputs are empty', () => {
      const { result } = renderHook(() => useArrayDifference([], []));
      expect(result.current).toEqual([]);
    });

    it('should handle null or undefined inputs', () => {
      const { result: result1 } = renderHook(() =>
        useArrayDifference(null, [1, 2, 3]),
      );
      expect(result1.current).toEqual([]);

      const { result: result2 } = renderHook(() =>
        useArrayDifference([1, 2, 3], undefined),
      );
      expect(result2.current).toEqual([]);
    });

    it('should use keySelector to compare complex objects', () => {
      const list = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
      ];
      const values = [
        { id: 2, name: 'Different Bob' },
        { id: 4, name: 'Different David' },
      ];
      const keySelector: KeySelector<{ id: number; name: string }> = (item) =>
        item.id;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, keySelector),
      );
      expect(result.current).toEqual([
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Charlie' },
      ]);
    });

    it('should handle keySelector with primitive values', () => {
      const list = ['a1', 'b2', 'c3', 'd4'];
      const values = ['b2', 'd4'];
      const keySelector: KeySelector<string> = (item) => item.charAt(0);

      const { result } = renderHook(() =>
        useArrayDifference(list, values, keySelector),
      );
      expect(result.current).toEqual(['a1', 'c3']);
    });

    it('should work correctly when keySelector produces duplicate keys', () => {
      const list = [
        { group: 'A', value: 1 },
        { group: 'A', value: 2 },
        { group: 'B', value: 3 },
        { group: 'B', value: 4 },
      ];
      const values = [
        { group: 'A', value: 5 },
        { group: 'B', value: 6 },
      ];
      const keySelector: KeySelector<{ group: string; value: number }> = (
        item,
      ) => item.group;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, keySelector),
      );
      expect(result.current).toEqual([]);
    });

    it('should handle empty values array with keySelector', () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const values: { id: number }[] = [];
      const keySelector: KeySelector<{ id: number }> = (item) => item.id;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, keySelector),
      );
      expect(result.current).toEqual(list);
    });

    it('should handle all items being filtered out with keySelector', () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const keySelector: KeySelector<{ id: number }> = (item) => item.id;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, keySelector),
      );
      expect(result.current).toEqual([]);
    });
  });

  describe('with keySelector', () => {
    it('should return the difference between two arrays', () => {
      const { result } = renderHook(() =>
        useArrayDifference([1, 2, 3, 4, 5], [2, 4]),
      );
      expect(result.current).toEqual([1, 3, 5]);
    });

    it('should return an empty array when inputs are empty', () => {
      const { result } = renderHook(() => useArrayDifference([], []));
      expect(result.current).toEqual([]);
    });

    it('should handle null or undefined inputs', () => {
      const { result: result1 } = renderHook(() =>
        useArrayDifference(null, [1, 2, 3]),
      );
      expect(result1.current).toEqual([]);

      const { result: result2 } = renderHook(() =>
        useArrayDifference([1, 2, 3], undefined),
      );
      expect(result2.current).toEqual([]);
    });
  });

  describe('with comparator', () => {
    it('should work with a custom comparator function', () => {
      const list = [1, 2, 3, 4, 5];
      const values = [2, 4];
      const comparator: Comparator<number> = (a, b) => a % 2 === b % 2;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, undefined, comparator),
      );
      expect(result.current).toEqual([1, 3, 5]);
    });

    it('should work with objects and a custom comparator', () => {
      const list = [{ value: 1 }, { value: 2 }, { value: 3 }];
      const values = [{ value: 2 }];
      const comparator: Comparator<{ value: number }> = (a, b) =>
        a.value === b.value;

      const { result } = renderHook(() =>
        useArrayDifference(list, values, undefined, comparator),
      );
      expect(result.current).toEqual([{ value: 1 }, { value: 3 }]);
    });
  });

  describe('edge cases', () => {
    it('should handle large arrays efficiently', () => {
      const largeList = Array.from({ length: 10000 }, (_, i) => i);
      const largeValues = Array.from({ length: 5000 }, (_, i) => i * 2);

      const { result } = renderHook(() =>
        useArrayDifference(largeList, largeValues),
      );
      expect(result.current.length).toBe(5000);
      expect(result.current[0]).toBe(1);
      expect(result.current[result.current.length - 1]).toBe(9999);
    });

    it('should handle arrays with duplicate values', () => {
      const list = [1, 2, 2, 3, 4, 4, 5];
      const values = [2, 4];

      const { result } = renderHook(() => useArrayDifference(list, values));
      expect(result.current).toEqual([1, 3, 5]);
    });
  });

  describe('memoization', () => {
    it('should memoize the result', () => {
      const list = [1, 2, 3, 4, 5];
      const values = [2, 4];

      const { result, rerender } = renderHook(
        ({ l, v }) => useArrayDifference(l, v),
        { initialProps: { l: list, v: values } },
      );

      const firstResult = result.current;
      rerender({ l: list, v: values });
      expect(result.current).toBe(firstResult);
    });
  });
});
