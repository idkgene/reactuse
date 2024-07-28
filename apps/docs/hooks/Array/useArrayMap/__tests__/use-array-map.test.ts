import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayMap } from '../use-array-map';

describe('useArrayMap', () => {
  describe('static array inputs', () => {
    it('should map over the array correctly', () => {
      const input = [1, 2, 3];
      const mapFn = (x: number): number => x * 2;

      const { result } = renderHook(() => useArrayMap(input, mapFn));

      expect(result.current).toEqual([2, 4, 6]);
    });

    it('should return a frozen array', () => {
      const input = [1, 2, 3];
      const mapFn = (x: number): number => x * 2;

      const { result } = renderHook(() => useArrayMap(input, mapFn));

      expect(Object.isFrozen(result.current)).toBe(true);
    });
  });

  describe('with function input', () => {
    it('should handle function input correctly', () => {
      const inputFn = (): number[] => [1, 2, 3];
      const mapFn = (x: number): number => x * 2;

      const { result } = renderHook(() => useArrayMap(inputFn, mapFn));

      expect(result.current).toEqual([2, 4, 6]);
    });
  });

  describe('with MaybeRef elements', () => {
    it('should handle MaybeRef elements correctly', () => {
      const input = [1, () => 2, 3];
      const mapFn = (x: number): number => x * 2;

      const { result } = renderHook(() => useArrayMap(input, mapFn));

      expect(result.current).toEqual([2, 4, 6]);
    });
  });

  describe('error handling', () => {
    it('should return an empty array and log a warning when input is not an array', () => {
      const consoleSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => undefined);
      const input = 'not an array';
      const mapFn = (x: unknown): unknown => x;

      const { result } = renderHook(() =>
        useArrayMap(input as unknown as readonly unknown[], mapFn),
      );

      expect(result.current).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'useArrayMap: provided list is not an array',
      );

      consoleSpy.mockRestore();
    });
  });

  describe('memoization', () => {
    it('should memoize the result', () => {
      const input = [1, 2, 3];
      const mapFn = vi.fn((x: number) => x * 2);

      const { result, rerender } = renderHook(() => useArrayMap(input, mapFn));

      expect(result.current).toEqual([2, 4, 6]);
      expect(mapFn).toHaveBeenCalledTimes(3);

      rerender();

      expect(result.current).toEqual([2, 4, 6]);
      expect(mapFn).toHaveBeenCalledTimes(3); // No additional calls
    });

    it('should update when input changes', () => {
      const initialInput = [1, 2, 3];
      const updatedInput = [4, 5, 6];
      const mapFn = (x: number): number => x * 2;

      const { result, rerender } = renderHook(
        ({ input }) => useArrayMap(input, mapFn),
        { initialProps: { input: initialInput } },
      );

      expect(result.current).toEqual([2, 4, 6]);

      rerender({ input: updatedInput });

      expect(result.current).toEqual([8, 10, 12]);
    });

    it('should update when mapFn changes', () => {
      const input = [1, 2, 3];
      const initialMapFn = (x: number): number => x * 2;
      const updatedMapFn = (x: number): number => x * 3;

      const { result, rerender } = renderHook(
        ({ mapFn }) => useArrayMap(input, mapFn),
        { initialProps: { mapFn: initialMapFn } },
      );

      expect(result.current).toEqual([2, 4, 6]);

      rerender({ mapFn: updatedMapFn });

      expect(result.current).toEqual([3, 6, 9]);
    });
  });

  describe('performance', () => {
    it('should not re-run mapFn unnecessarily', () => {
      const input = [1, 2, 3];
      const mapFn = vi.fn((x: number) => x * 2);

      const { rerender } = renderHook(() => useArrayMap(input, mapFn));

      expect(mapFn).toHaveBeenCalledTimes(3);

      rerender();

      expect(mapFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array input', () => {
      const input: number[] = [];
      const mapFn = (x: number): number => x * 2;

      const { result } = renderHook(() => useArrayMap(input, mapFn));

      expect(result.current).toEqual([]);
    });

    it('should handle array with undefined and null values', () => {
      const input = [1, undefined, null, 4];
      const mapFn = (x: number | null | undefined): number => (x ? x * 2 : 0);

      const { result } = renderHook(() => useArrayMap(input, mapFn));

      expect(result.current).toEqual([2, 0, 0, 8]);
    });
  });
});
