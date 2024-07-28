import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayFindIndex } from '../use-array-find-index';

describe('useArrayFindIndex', () => {
  describe('basic functionality', () => {
    it('should find the index of an element in an array', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = (num: number): boolean => num === 3;

      const { result } = renderHook(() => useArrayFindIndex(array, predicate));

      expect(result.current).toBe(2);
    });

    it('should return -1 if element is not found', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = (num: number): boolean => num === 6;

      const { result } = renderHook(() => useArrayFindIndex(array, predicate));

      expect(result.current).toBe(-1);
    });

    it('should work with a function returning an array', () => {
      const arrayFn = (): number[] => [1, 2, 3, 4, 5];
      const predicate = (num: number): boolean => num === 3;

      const { result } = renderHook(() =>
        useArrayFindIndex(arrayFn, predicate),
      );

      expect(result.current).toBe(2);
    });

    it('should work with empty arrays', () => {
      const emptyArray: number[] = [];
      const predicate = (num: number): boolean => num === 1;

      const { result } = renderHook(() =>
        useArrayFindIndex(emptyArray, predicate),
      );

      expect(result.current).toBe(-1);
    });

    it('should provide correct index and array to predicate', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const predicate = vi.fn(
        (element: string, index: number, arr: string[]) => {
          expect(arr).toEqual(array);
          return element === 'c' && index === 2;
        },
      );

      const { result } = renderHook(() => useArrayFindIndex(array, predicate));

      expect(result.current).toBe(2);
      expect(predicate).toHaveBeenCalledTimes(3);
      expect(predicate).toHaveBeenCalledWith('a', 0, array);
      expect(predicate).toHaveBeenCalledWith('b', 1, array);
      expect(predicate).toHaveBeenCalledWith('c', 2, array);
    });
  });

  describe('memoization', () => {
    it('should memoize the result', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = vi.fn((num: number) => num === 3);

      const { result, rerender } = renderHook(() =>
        useArrayFindIndex(array, predicate),
      );

      expect(result.current).toBe(2);
      expect(predicate).toHaveBeenCalledTimes(3);

      rerender();

      expect(result.current).toBe(2);
      expect(predicate).toHaveBeenCalledTimes(3);
    });

    it('should update when deps change', () => {
      const array = [1, 2, 3, 4, 5];
      const initialTargetNum = 3;

      const { result, rerender } = renderHook(
        ({ targetNum }) => {
          const predicate = (num: number): boolean => num === targetNum;
          return useArrayFindIndex(array, predicate, [targetNum]);
        },
        { initialProps: { targetNum: initialTargetNum } },
      );

      expect(result.current).toBe(2);

      rerender({ targetNum: 4 });

      expect(result.current).toBe(3);
    });
  });

  describe('error handling', () => {
    it('should throw an error for non-array input', () => {
      const nonArray = {} as unknown as never;
      const predicate = (num: number): boolean => num === 3;

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      const { result } = renderHook(() =>
        useArrayFindIndex(nonArray, predicate),
      );

      expect(result.current).toBe(-1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in useArrayFindIndex:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });

    it('should throw an error for non-function predicate', () => {
      const array = [1, 2, 3, 4, 5];
      const nonFunctionPredicate = {} as unknown as never;

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      const { result } = renderHook(() =>
        useArrayFindIndex(array, nonFunctionPredicate),
      );

      expect(result.current).toBe(-1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in useArrayFindIndex:',
        expect.any(Error),
      );
    });

    it('should handle errors in the array function', () => {
      const errorFn = (): never => {
        throw new Error('Array function error');
      };
      const predicate = (num: number): boolean => num === 1;

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      const { result } = renderHook(() =>
        useArrayFindIndex(errorFn, predicate),
      );

      expect(result.current).toBe(-1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in useArrayFindIndex:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle errors in the predicate function', () => {
      const array = [1, 2, 3, 4, 5];
      const errorPredicate = (): never => {
        throw new Error('Predicate error');
      };

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      const { result } = renderHook(() =>
        useArrayFindIndex(array, errorPredicate),
      );

      expect(result.current).toBe(-1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in useArrayFindIndex:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
