import { renderHook } from '@testing-library/react';
import { useArrayDifference } from '../useArrayDifference';

describe('useArrayDifference', () => {
  it('should return the difference between two arrays of primitive values', () => {
    const list = [1, 2, 3, 4, 5];
    const values = [3, 4, 6];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([1, 2, 5]);
  });

  it('should return the difference between two arrays of objects based on a key', () => {
    const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const values = [{ id: 3 }, { id: 4 }, { id: 6 }];
    const { result } = renderHook(() => useArrayDifference(list, values, 'id'));
    expect(result.current).toEqual([{ id: 1 }, { id: 2 }, { id: 5 }]);
  });

  it('should return the difference between two arrays of objects based on a comparison function', () => {
    const list = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Bob' },
    ];
    const values = [
      { id: 2, name: 'Jane' },
      { id: 4, name: 'Alice' },
    ];
    const compareFn = (a: { name: string }, b: { name: string }) =>
      a.name === b.name;
    const { result } = renderHook(() =>
      useArrayDifference(list, values, compareFn)
    );
    expect(result.current).toEqual([
      { id: 1, name: 'John' },
      { id: 3, name: 'Bob' },
    ]);
  });

  it('should return an empty array when the lists are the same', () => {
    const list = [1, 2, 3];
    const values = [1, 2, 3];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([]);
  });

  it('should return the original list when the values array is empty', () => {
    const list = [1, 2, 3];
    const values: number[] = [];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should return an empty array when the original list is empty', () => {
    const list: number[] = [];
    const values = [1, 2, 3];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([]);
  });

  it('should handle large arrays efficiently', () => {
    const list = Array.from({ length: 10000 }, (_, i) => i);
    const values = Array.from({ length: 5000 }, (_, i) => i);
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current.length).toBe(5000);
    expect(result.current[0]).toBe(5000);
    expect(result.current[4999]).toBe(9999);
  });

  it('should handle arrays with duplicate values', () => {
    const list = [1, 2, 3, 2, 4, 3, 5];
    const values = [2, 3, 3, 6];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([1, 4, 5]);
  });

  it('should handle arrays with mixed types', () => {
    const list = [1, '2', 3, '4', 5];
    const values = ['2', 4];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([1, 3, '4', 5]);
  });

  it('should handle arrays with null and undefined values', () => {
    const list = [1, null, 2, undefined, 3];
    const values = [null, 3, undefined];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([1, 2]);
  });

  it('should handle arrays with non-primitive values', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const list = [obj1, obj2, obj3];
    const values = [obj2];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([obj1, obj3]);
  });

  it('should handle empty arrays efficiently', () => {
    const list: any[] = [];
    const values: any[] = [];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([]);
  });

  it('should handle invalid key gracefully', () => {
    const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const values = [{ id: 2 }];
    const { result } = renderHook(() =>
      useArrayDifference(list, values, 'invalidKey' as any)
    );
    expect(result.current).toEqual([]);
  });
});
