import { renderHook } from '@testing-library/react';
import { useSorted } from '../useSorted';

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

  it('should sort the array using a custom sort function', () => {
    const sortFn = (arr: any[]) => arr.slice().reverse();
    const { result } = renderHook(() => useSorted(numbers, { sortFn }));
    expect(result.current).toEqual([5, 3, 5, 6, 2, 9, 5, 1, 4, 1, 3]);
  });

  it('should sort the array in-place when dirty flag is set', () => {
    const { result } = renderHook(() => useSorted(numbers, { dirty: true }));
    expect(result.current).toBe(numbers);
    expect(numbers).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
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
});
