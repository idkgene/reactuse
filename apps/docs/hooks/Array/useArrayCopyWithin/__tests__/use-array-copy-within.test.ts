import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useArrayCopyWithin } from '../use-array-copy-within';

describe('useArrayCopyWithin', () => {
  describe('basic functionality', () => {
    it('should initialize with the provided array', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      expect(result.current.array).toEqual(initialArray);
    });

    it('should copy within the array when copyWithin is called', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(0, 3);
      });

      expect(result.current.array).toEqual([4, 5, 3, 4, 5]);
    });

    it('should handle copyWithin with end parameter', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(1, 3, 4);
      });

      expect(result.current.array).toEqual([1, 4, 3, 4, 5]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(0, 3);
      });

      expect(initialArray).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      const initialArray: number[] = [];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(0, 0);
      });

      expect(result.current.array).toEqual([]);
    });

    it('should handle arrays with one element', () => {
      const initialArray = [1];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(0, 0);
      });

      expect(result.current.array).toEqual([1]);
    });

    it('should handle out of bounds indices', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useArrayCopyWithin(initialArray));

      act(() => {
        result.current.copyWithin(5, 0);
      });

      expect(result.current.array).toEqual([1, 2, 3]);
    });
  });
});
