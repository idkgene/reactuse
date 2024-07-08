import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import {
  useArrayDifference,
  type UseArrayDifferenceKey,
} from '../use-array-difference';

describe('useArrayDifference', () => {
  it('should return an empty array when the list is empty', () => {
    const { result } = renderHook(() => useArrayDifference([], [{ id: 1 }]));
    expect(result.current).toEqual([]);
  });

  it('should return the original list when values is empty', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => useArrayDifference(list, []));
    expect(result.current).toEqual(list);
  });

  it('should filter out items based on a key comparison', () => {
    const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const values = [{ id: 2 }];
    const { result } = renderHook(() => useArrayDifference(list, values, 'id'));
    expect(result.current).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('should filter out items based on a custom comparison function', () => {
    const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const values = [{ id: 2 }];
    const compareFn = (a: { id: number }, b: { id: number }): boolean => a.id === b.id;
    const { result } = renderHook(() =>
      useArrayDifference(list, values, compareFn),
    );
    expect(result.current).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('should throw an error when list is not an array', () => {
    const invalidList = 'not an array' as unknown as object[];
    expect(() => renderHook(() => useArrayDifference(invalidList, []))).toThrow(
      'useArrayDifference: Both list and values must be arrays',
    );
  });

  it('should throw an error when values is not an array', () => {
    const invalidValues = 'not an array' as unknown as object[];
    expect(() =>
      renderHook(() => useArrayDifference([], invalidValues)),
    ).toThrow('useArrayDifference: Both list and values must be arrays');
  });

  it('should throw an error when an invalid key is provided', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const values = [{ id: 2 }];
    const invalidKey = 'invalidKey' as UseArrayDifferenceKey<{ id: number }>;
    expect(() =>
      renderHook(() => useArrayDifference(list, values, invalidKey)),
    ).toThrow('useArrayDifference: Invalid key "invalidKey" for comparison');
  });

  it('should throw an error when keyOrCompareFn is neither a string nor a function', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const values = [{ id: 2 }];
    const invalidKey = 123 as unknown as UseArrayDifferenceKey<{ id: number }>;
    expect(() =>
      renderHook(() => useArrayDifference(list, values, invalidKey)),
    ).toThrow('useArrayDifference: Invalid keyOrCompareFn parameter');
  });

  it('should log errors to console.error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      /* noop */
    });
    const list = [{ id: 1 }, { id: 2 }];
    const values = [{ id: 2 }];
    const invalidKey = 'invalidKey' as UseArrayDifferenceKey<{ id: number }>;

    expect(() =>
      renderHook(() => useArrayDifference(list, values, invalidKey)),
    ).toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in useArrayDifference:',
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it('should memoize the result', () => {
    const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const values = [{ id: 2 }];
    const { result, rerender } = renderHook(
      (props: { list: typeof list; values: typeof values }) =>
        useArrayDifference(props.list, props.values, 'id'),
      { initialProps: { list, values } },
    );

    const firstResult = result.current;
    rerender({ list, values });
    expect(result.current).toBe(firstResult);
  });

  it('should update the result when inputs change', () => {
    const initialList = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const initialValues = [{ id: 2 }];
    const { result, rerender } = renderHook(
      (props: { list: typeof initialList; values: typeof initialValues }) =>
        useArrayDifference(props.list, props.values, 'id'),
      { initialProps: { list: initialList, values: initialValues } },
    );

    expect(result.current).toEqual([{ id: 1 }, { id: 3 }]);

    const newList = [...initialList, { id: 4 }];
    rerender({ list: newList, values: initialValues });
    expect(result.current).toEqual([{ id: 1 }, { id: 3 }, { id: 4 }]);

    const newValues = [...initialValues, { id: 3 }];
    rerender({ list: newList, values: newValues });
    expect(result.current).toEqual([{ id: 1 }, { id: 4 }]);
  });

  it('should handle empty objects', () => {
    const list = [{}, {}, {}] as Record<string, never>[];
    const values = [{}] as Record<string, never>[];
    const { result } = renderHook(() => useArrayDifference(list, values));
    expect(result.current).toEqual([{}, {}, {}]);
  });

  it('should handle objects with nested properties', () => {
    const list = [
      { user: { id: 1, name: 'Alice' } },
      { user: { id: 2, name: 'Bob' } },
      { user: { id: 3, name: 'Charlie' } },
    ];
    const values = [{ user: { id: 2, name: 'Bob' } }];
    const compareFn = (a: (typeof list)[0], b: (typeof values)[0]): boolean =>
      a.user.id === b.user.id;
    const { result } = renderHook(() =>
      useArrayDifference(list, values, compareFn),
    );
    expect(result.current).toEqual([
      { user: { id: 1, name: 'Alice' } },
      { user: { id: 3, name: 'Charlie' } },
    ]);
  });
});
