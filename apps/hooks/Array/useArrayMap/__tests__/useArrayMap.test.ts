import { renderHook } from '@testing-library/react';
import { useArrayMap } from '../useArrayMap';
import { expect, it, describe } from 'vitest';

describe('useArrayMap', () => {
  it('should return an empty array when the input list is empty', () => {
    const { result } = renderHook(() => useArrayMap([], (element) => element));
    expect(result.current).toEqual([]);
  });

  it('should correctly map over the array with numbers', () => {
    const list = [1, 2, 3];
    const callback = (n: number) => n * 2;
    const expected = [2, 4, 6];
    const { result } = renderHook(() => useArrayMap(list, callback));
    expect(result.current).toEqual(expected);
  });

  it('should correctly map over the array with strings', () => {
    const list = ['a', 'b', 'c'];
    const callback = (s: string) => s.toUpperCase();
    const expected = ['A', 'B', 'C'];
    const { result } = renderHook(() => useArrayMap(list, callback));
    expect(result.current).toEqual(expected);
  });

  it('should return an empty array when given an empty array', () => {
    const list: any[] = [];
    const callback = (x: any) => x;
    const expected: any[] = [];
    const { result } = renderHook(() => useArrayMap(list, callback));
    expect(result.current).toEqual(expected);
  });

  it('should update the mapped array if the list changes', () => {
    const callback = (element: number) => element * 2;
    const { result, rerender } = renderHook(
      (props) => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback },
      },
    );

    expect(result.current).toEqual([2, 4, 6]);

    rerender({ list: [4, 5, 6], callback });
    expect(result.current).toEqual([8, 10, 12]);
  });

  it('should update the mapped array if the callback changes', () => {
    const callback1 = (element: number) => element * 2;
    const callback2 = (element: number) => element + 1;

    const { result, rerender } = renderHook(
      (props) => useArrayMap(props.list, props.callback),
      {
        initialProps: { list: [1, 2, 3], callback: callback1 },
      },
    );

    expect(result.current).toEqual([2, 4, 6]);

    rerender({ list: [1, 2, 3], callback: callback2 });
    expect(result.current).toEqual([2, 3, 4]);
  });
});
