import { renderHook } from '@testing-library/react';
import { useSorted, defaultSortFn, sortArray } from '../useSorted';

describe('useSorted', () => {
  const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

  it('should sort the array in ascending order by default', () => {
    const { result } = renderHook(() => useSorted(numbers));
    expect(result.current).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  it('should sort the array using a custom compare function', () => {
    const compareFn = (a: number, b: number) => b - a;
    const { result } = renderHook(() => useSorted(numbers, compareFn));
    expect(result.current).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1]);
  });

  it('should use the custom sort function when provided', () => {
    const mockSortFn = jest.fn((arr: number[]) => arr.slice().reverse());
    const { result } = renderHook(() =>
      useSorted(numbers, { sortFn: mockSortFn })
    );

    expect(mockSortFn).toHaveBeenCalledWith(numbers, undefined);
    expect(result.current).toEqual([5, 3, 5, 6, 2, 9, 5, 1, 4, 1, 3]);
  });

  it('should sort the array in-place when dirty flag is set', () => {
    const mutableArray = [...numbers];
    const { result } = renderHook(() =>
      useSorted(mutableArray, { dirty: true })
    );
    expect(result.current).toBe(mutableArray);
    expect(mutableArray).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  it('should memoize the sorted array when the source array remains the same', () => {
    const { result, rerender } = renderHook(() => useSorted(numbers));
    const sortedArray = result.current;
    rerender();
    expect(result.current).toBe(sortedArray);
  });

  it('should update the sorted array when the source array changes', () => {
    const { result, rerender } = renderHook(({ input }) => useSorted(input), {
      initialProps: { input: numbers },
    });

    const sortedArray = result.current;
    rerender({ input: [...numbers, 7] });
    expect(result.current).not.toBe(sortedArray);
    expect(result.current).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 9]);
  });

  it('should update the sorted array when the compare function changes', () => {
    const { result, rerender } = renderHook(
      props =>
        useSorted(
          numbers,
          (props as { compareFn: (a: number, b: number) => number }).compareFn
        ),
      {
        initialProps: { compareFn: (a: number, b: number) => a - b },
      }
    );
    const sortedArray = result.current;
    rerender({ compareFn: (a, b) => b - a });
    expect(result.current).not.toBe(sortedArray);
    expect(result.current).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1]);
  });

  it('should update the sorted array when options change', () => {
    const { result, rerender } = renderHook(
      props => useSorted(numbers, props as { dirty: boolean }),
      {
        initialProps: { dirty: false },
      }
    );
    const sortedArray = result.current;
    rerender({ dirty: true });
    expect(result.current).not.toBe(sortedArray);
    expect(result.current).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });
});

describe('defaultSortFn', () => {
  it('should sort the array in ascending order by default', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sortedArray = defaultSortFn(numbers);
    expect(sortedArray).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  it('should sort the array using a custom compare function', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const compareFn = (a: number, b: number) => b - a;
    const sortedArray = defaultSortFn(numbers, compareFn);
    expect(sortedArray).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1]);
  });
});

describe('sortArray', () => {
  it('should sort the array using the default sort function', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sortedArray = sortArray(numbers);
    expect(sortedArray).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  it('should sort the array using a custom compare function', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const compareFn = (a: number, b: number) => b - a;
    const sortedArray = sortArray(numbers, compareFn);
    expect(sortedArray).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1]);
  });

  it('should use the custom sort function when provided', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const mockSortFn = jest.fn((arr: number[]) => arr.slice().reverse());
    const sortedArray = sortArray(numbers, undefined, { sortFn: mockSortFn });

    expect(mockSortFn).toHaveBeenCalledWith(numbers, undefined);
    expect(sortedArray).toEqual([5, 3, 5, 6, 2, 9, 5, 1, 4, 1, 3]);
  });
});
