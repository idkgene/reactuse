import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useArrayEvery } from '../use-array-every';

describe('useArrayEvery', () => {
  it('should return true when all elements satisfy the predicate', () => {
    const list = [2, 4, 6, 8];
    const predicate = (num: number): boolean => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(list, predicate));
    expect(result.current).toBe(true);
  });

  it('should return false when at least one element does not satisfy the predicate', () => {
    const list = [2, 4, 5, 8];
    const predicate = (num: number): boolean => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(list, predicate));
    expect(result.current).toBe(false);
  });

  it('should return true for an empty array', () => {
    const list: number[] = [];
    const predicate = (num: number): boolean => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(list, predicate));
    expect(result.current).toBe(true);
  });

  it('should return false and log a warning when list is null', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    const predicate = (num: number): boolean => num % 2 === 0;
    const { result } = renderHook(() => useArrayEvery(null, predicate));
    expect(result.current).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'useArrayEvery: list is null or undefined',
    );
    consoleSpy.mockRestore();
  });

  it('should throw an error when list is not an array', () => {
    const predicate = (num: number): boolean => num % 2 === 0;
    expect(() => {
      renderHook(() => useArrayEvery({} as unknown as number[], predicate));
    }).toThrow('useArrayEvery: list must be an array');
  });

  it('should throw an error when predicate is not a function', () => {
    const list = [1, 2, 3];
    expect(() => {
      renderHook(() =>
        useArrayEvery(list, 'not a function' as unknown as () => boolean),
      );
    }).toThrow('useArrayEvery: predicate must be a function');
  });

  it('should return false and log an error when predicate throws an error', () => {
    const list = [1, 2, 3];
    const predicate = (): never => {
      throw new Error('Predicate error');
    };
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
    const { result } = renderHook(() => useArrayEvery(list, predicate));
    expect(result.current).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'useArrayEvery: Error during execution:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });

  it('should memoize the result and not recompute when dependencies have not changed', () => {
    const list = [2, 4, 6, 8];
    const predicate = vi.fn((num: number) => num % 2 === 0);
    const { result, rerender } = renderHook(() =>
      useArrayEvery(list, predicate),
    );

    expect(result.current).toBe(true);
    expect(predicate).toHaveBeenCalledTimes(4);

    predicate.mockClear();
    rerender();

    expect(result.current).toBe(true);
    expect(predicate).not.toHaveBeenCalled();
  });

  it('should recompute when the list changes', () => {
    const initialList = [2, 4, 6, 8];
    const predicate = vi.fn((num: number) => num % 2 === 0);
    const { result, rerender } = renderHook(
      ({ list }) => useArrayEvery(list, predicate),
      { initialProps: { list: initialList } },
    );

    expect(result.current).toBe(true);
    expect(predicate).toHaveBeenCalledTimes(4);

    predicate.mockClear();
    const newList = [2, 4, 5, 8];
    rerender({ list: newList });

    expect(result.current).toBe(false);
    expect(predicate).toHaveBeenCalledTimes(3);
  });

  it('should recompute when the predicate changes', () => {
    const list = [1, 2, 3, 4];
    const initialPredicate = vi.fn((num: number) => num % 2 === 0);
    const { result, rerender } = renderHook(
      ({ predicate }) => useArrayEvery(list, predicate),
      { initialProps: { predicate: initialPredicate } },
    );

    expect(result.current).toBe(false);
    expect(initialPredicate).toHaveBeenCalledTimes(1);

    initialPredicate.mockClear();
    const newPredicate = vi.fn((num: number) => num > 0);
    rerender({ predicate: newPredicate });

    expect(result.current).toBe(true);
    expect(newPredicate).toHaveBeenCalledTimes(4);
  });

  it('should handle arrays of objects correctly', () => {
    const list = [
      { id: 1, active: true },
      { id: 2, active: true },
      { id: 3, active: true },
    ];
    const predicate = (obj: { id: number; active: boolean }): boolean =>
      obj.active;
    const { result } = renderHook(() => useArrayEvery(list, predicate));
    expect(result.current).toBe(true);
  });
});
