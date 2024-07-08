import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import {
  type UseArrayFindIndexPredicate,
  useArrayFindIndex,
} from '../use-array-find-index';

describe('useArrayFindIndex', () => {
  it('should return the correct index when element is found', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = (num: number): boolean => num === 3;

    const { result } = renderHook(() => useArrayFindIndex(list, predicate));

    expect(result.current).toBe(2);
  });

  it('should return -1 when element is not found', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = (num: number): boolean => num === 6;

    const { result } = renderHook(() => useArrayFindIndex(list, predicate));

    expect(result.current).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    const list: number[] = [];
    const predicate = (num: number): boolean => num === 1;

    const { result } = renderHook(() => useArrayFindIndex(list, predicate));

    expect(result.current).toBe(-1);
  });

  it('should return -1 and log a warning when list is null', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    const predicate = (num: number): boolean => num === 1;

    const { result } = renderHook(() => useArrayFindIndex(null, predicate));

    expect(result.current).toBe(-1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'useArrayFindIndex: list is null or undefined',
    );

    consoleWarnSpy.mockRestore();
  });

  it('should throw an error when list is undefined', () => {
    const predicate = (num: number): boolean => num === 1;

    expect(() => {
      renderHook(() => useArrayFindIndex(undefined, predicate));
    }).toThrow('useArrayFindIndex: list must be an array');
  });

  it('should throw an error when list is not an array', () => {
    const notAnArray = 'not an array' as unknown;
    const predicate = (num: number): boolean => num === 1;

    expect(() => {
      renderHook(() => useArrayFindIndex(notAnArray as number[], predicate));
    }).toThrow('useArrayFindIndex: list must be an array');
  });

  it('should throw an error when predicate is not a function', () => {
    const list = [1, 2, 3];
    const notAFunction = 'not a function' as unknown;

    expect(() => {
      renderHook(() =>
        useArrayFindIndex(
          list,
          notAFunction as UseArrayFindIndexPredicate<number>,
        ),
      );
    }).toThrow('useArrayFindIndex: predicate must be a function');
  });

  it('should return -1 and log an error when predicate throws an error', () => {
    const list = [1, 2, 3];
    const errorPredicate = (): boolean => {
      throw new Error('Predicate error');
    };
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });

    const { result } = renderHook(() =>
      useArrayFindIndex(list, errorPredicate),
    );

    expect(result.current).toBe(-1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useArrayFindIndex: Error during execution:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it('should memoize the result and not recompute for the same inputs', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = vi.fn((num: number) => num === 3);

    const { result, rerender } = renderHook(() =>
      useArrayFindIndex(list, predicate),
    );

    expect(result.current).toBe(2);
    expect(predicate).toHaveBeenCalledTimes(3);

    predicate.mockClear();

    rerender();

    expect(result.current).toBe(2);
    expect(predicate).not.toHaveBeenCalled();
  });

  it('should recompute when the list changes', () => {
    const initialList = [1, 2, 3];
    const updatedList = [1, 2, 3, 4];
    const predicate = (num: number): boolean => num === 3;

    const { result, rerender } = renderHook(
      ({ list }) => useArrayFindIndex(list, predicate),
      { initialProps: { list: initialList } },
    );

    expect(result.current).toBe(2);

    rerender({ list: updatedList });

    expect(result.current).toBe(2);
  });

  it('should recompute when the predicate changes', () => {
    const list = [1, 2, 3, 4, 5];
    const initialPredicate = (num: number): boolean => num === 3;
    const updatedPredicate = (num: number): boolean => num === 4;

    const { result, rerender } = renderHook(
      ({ predicate }) => useArrayFindIndex(list, predicate),
      { initialProps: { predicate: initialPredicate } },
    );

    expect(result.current).toBe(2);

    rerender({ predicate: updatedPredicate });

    expect(result.current).toBe(3);
  });
});
