import { renderHook } from '@testing-library/react';
import { useArrayIncludes } from '../useArrayIncludes';
import { UseArrayIncludesOptions } from '../../array';

describe('useArrayIncludes', () => {
  it('should return false when list is empty', () => {
    const { result } = renderHook(() => useArrayIncludes([], 1));
    expect(result.current).toBe(false);
  });

  it('should return true when value is included in the array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useArrayIncludes(numbers, 3));
    expect(result.current).toBe(true);
  });

  it('should return false when value is not included in the array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useArrayIncludes(numbers, 6));
    expect(result.current).toBe(false);
  });

  it('should handle fromIndex option correctly', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result: result1 } = renderHook(() =>
      useArrayIncludes(numbers, 3, { fromIndex: 2 })
    );
    expect(result1.current).toBe(true);

    const { result: result2 } = renderHook(() =>
      useArrayIncludes(numbers, 3, { fromIndex: 3 })
    );
    expect(result2.current).toBe(false);
  });

  it('should handle comparator function correctly', () => {
    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const comparator = (a: { id: number }, b: number) => a.id === b;
    const { result } = renderHook(() =>
      useArrayIncludes(objects, 2, { comparator })
    );
    expect(result.current).toBe(true);
  });

  it('should handle comparator string correctly', () => {
    const items = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ];
    const { result } = renderHook(() =>
      useArrayIncludes(items, 2, { comparator: 'id' })
    );
    expect(result.current).toBe(true);
  });

  it('should return false for invalid comparator key', () => {
    const objects = [{ key: 'a' }, { key: 'b' }];
    const options: UseArrayIncludesOptions<{ key: string }, string> = {
      comparator: 'invalidKey' as any,
    };
    const { result } = renderHook(() =>
      useArrayIncludes(objects, 'a', options)
    );
    expect(result.current).toBe(false);
  });

  it('should memoize the result when dependencies are the same', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result, rerender } = renderHook(() => useArrayIncludes(numbers, 3));

    const firstResult = result.current;
    rerender();
    expect(result.current).toBe(firstResult);
  });

  it('should handle undefined comparator', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() =>
      useArrayIncludes(numbers, 3, { comparator: undefined })
    );
    expect(result.current).toBe(true);
  });

  it('should handle null comparator', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() =>
      useArrayIncludes(numbers, 3, { comparator: null as any })
    );
    expect(result.current).toBe(true);
  });

  it('should handle undefined fromIndex', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() =>
      useArrayIncludes(numbers, 3, { fromIndex: undefined })
    );
    expect(result.current).toBe(true);
  });

  it('should handle null fromIndex', () => {
    const numbers = [1, 2, 3, 4, 5];
    const { result } = renderHook(() =>
      useArrayIncludes(numbers, 3, { fromIndex: null as any })
    );
    expect(result.current).toBe(false);
  });
});
