import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useArrayFill } from '../use-array-fill';

describe('useArrayFill', () => {
  describe('initialization', () => {
    it('should initialize with the provided array', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useArrayFill(initialArray));
      expect(result.current[0]).toEqual(initialArray);
    });

    it('should work with an empty array', () => {
      const { result } = renderHook(() => useArrayFill<number>([]));
      expect(result.current[0]).toEqual([]);
    });
  });

  describe('fill functionality', () => {
    it('should fill the array with the provided value', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useArrayFill(initialArray));

      act(() => {
        result.current[1](5);
      });

      expect(result.current[0]).toEqual([5, 5, 5]);
    });

    it('should handle multiple fills', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useArrayFill(initialArray));

      act(() => {
        result.current[1](5);
      });

      expect(result.current[0]).toEqual([5, 5, 5]);

      act(() => {
        result.current[1](10);
      });

      expect(result.current[0]).toEqual([10, 10, 10]);
    });
  });

  describe('type handling', () => {
    it('should work with different data types', () => {
      const { result: numberResult } = renderHook(() =>
        useArrayFill([1, 2, 3]),
      );
      const { result: stringResult } = renderHook(() =>
        useArrayFill(['a', 'b', 'c']),
      );
      const { result: objectResult } = renderHook(() =>
        useArrayFill([{ id: 1 }, { id: 2 }]),
      );

      act(() => {
        numberResult.current[1](0);
        stringResult.current[1]('x');
        objectResult.current[1]({ id: 3 });
      });

      expect(numberResult.current[0]).toEqual([0, 0, 0]);
      expect(stringResult.current[0]).toEqual(['x', 'x', 'x']);
      expect(objectResult.current[0]).toEqual([{ id: 3 }, { id: 3 }]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useArrayFill(initialArray));

      act(() => {
        result.current[1](5);
      });

      expect(initialArray).toEqual([1, 2, 3]);
    });
  });
});
