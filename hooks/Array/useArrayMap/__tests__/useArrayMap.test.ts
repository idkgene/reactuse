import { renderHook } from '@testing-library/react';
import { useArrayMap } from '../useArrayMap';
import each from 'jest-each';

describe('useArrayMap', () => {
  it('should return an empty array when the input list is empty', () => {
    const { result } = renderHook(() => useArrayMap([], element => element));
    expect(result.current).toEqual([]);
  });

  each([
    [[1, 2, 3], (n: number) => n * 2, [2, 4, 6]],
    [['a', 'b', 'c'], (s: string) => s.toUpperCase(), ['A', 'B', 'C']],
    [[], (x: any) => x, []],
  ]).it(
    'should correctly map over the array: list=%s, callback=%s, expected=%s',
    (list, callback, expected) => {
      const { result } = renderHook(() => useArrayMap(list, callback));
      expect(result.current).toEqual(expected);
    }
  );

  it('should update the mapped array if the list changes', () => {
    const callback = (element: number) => element * 2;
    const { result, rerender } = renderHook(
      props => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback },
      }
    );

    expect(result.current).toEqual([2, 4, 6]);

    rerender({ list: [4, 5, 6], callback });
    expect(result.current).toEqual([8, 10, 12]);
  });

  it('should update the mapped array if the callback changes', () => {
    const callback1 = (element: number) => element * 2;
    const callback2 = (element: number) => element + 1;

    const { result, rerender } = renderHook(
      props => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback: callback1 },
      }
    );

    expect(result.current).toEqual([2, 4, 6]);

    rerender({ list: [1, 2, 3], callback: callback2 });
    expect(result.current).toEqual([2, 3, 4]);
  });
});
