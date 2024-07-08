import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { type UseArrayFindPredicate, useArrayFind } from '../use-array-find';

describe('useArrayFind', () => {
  it('should return the first element that satisfies the predicate', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = (num: number): boolean => num > 3;

    const { result } = renderHook(() => useArrayFind(list, predicate));

    expect(result.current).toBe(4);
  });

  it('should return undefined if no element satisfies the predicate', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = (num: number): boolean => num > 10;

    const { result } = renderHook(() => useArrayFind(list, predicate));

    expect(result.current).toBeUndefined();
  });

  it('should return undefined for an empty array', () => {
    const list: number[] = [];
    const predicate = (num: number): boolean => num > 3;

    const { result } = renderHook(() => useArrayFind(list, predicate));

    expect(result.current).toBeUndefined();
  });

  it('should return undefined and log a warning for null list', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    const predicate = (num: number): boolean => num > 3;

    const { result } = renderHook(() => useArrayFind(null, predicate));

    expect(result.current).toBeUndefined();
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'useArrayFind: list is null or undefined',
    );

    consoleWarnMock.mockRestore();
  });

  it('should throw an error for undefined list', () => {
    const predicate = (num: number): boolean => num > 3;

    expect(() => {
      renderHook(() => useArrayFind(undefined, predicate));
    }).toThrow('useArrayFind: list must be an array');
  });

  it('should throw an error if list is not an array', () => {
    const list = {} as unknown;
    const predicate = (num: number): boolean => num > 3;

    expect(() => {
      renderHook(() => useArrayFind(list as number[], predicate));
    }).toThrow('useArrayFind: list must be an array');
  });

  it('should throw an error if predicate is not a function', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = 'not a function' as unknown;

    expect(() => {
      renderHook(() =>
        useArrayFind(list, predicate as UseArrayFindPredicate<number>),
      );
    }).toThrow('useArrayFind: predicate must be a function');
  });

  it('should return undefined and log an error if predicate throws an error', () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = (): boolean => {
      throw new Error('Predicate error');
    };
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });

    const { result } = renderHook(() => useArrayFind(list, predicate));

    expect(result.current).toBeUndefined();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'useArrayFind: Error during execution:',
      expect.any(Error),
    );

    consoleErrorMock.mockRestore();
  });

  it("should memoize the result and not recompute if inputs haven't changed", () => {
    const list = [1, 2, 3, 4, 5];
    const predicate = vi.fn((num: number) => num > 3);
  
    const { result } = renderHook(() =>
      useArrayFind(list, predicate),
    );
  
    expect(result.current).toBe(4);
    expect(predicate).toHaveBeenCalledTimes(4);
  });

  it('should recompute if the list changes', () => {
    const initialList = [1, 2, 3, 4, 5];
    const newList = [6, 7, 8, 9, 10];
    const predicate = vi.fn((num: number) => num > 8);

    const { result, rerender } = renderHook(
      ({ list }) => useArrayFind(list, predicate),
      { initialProps: { list: initialList } },
    );

    expect(result.current).toBeUndefined();
    expect(predicate).toHaveBeenCalledTimes(5);

    rerender({ list: newList });

    expect(result.current).toBe(9);
    expect(predicate).toHaveBeenCalledTimes(9);
  });

  it('should recompute if the predicate changes', () => {
    const list = [1, 2, 3, 4, 5];
    const initialPredicate = vi.fn((num: number) => num > 3);
    const newPredicate = vi.fn((num: number) => num % 2 === 0);

    const { result, rerender } = renderHook(
      ({ predicate }) => useArrayFind(list, predicate),
      { initialProps: { predicate: initialPredicate } },
    );

    expect(result.current).toBe(4);
    expect(initialPredicate).toHaveBeenCalledTimes(4);

    rerender({ predicate: newPredicate });

    expect(result.current).toBe(2);
    expect(newPredicate).toHaveBeenCalledTimes(2);
  });
});
