import { useArrayJoin } from '../useArrayJoin';
import { renderHook } from '@testing-library/react';

describe('useArrayJoin', () => {
  it('should return an empty string when the list is empty', () => {
    const { result } = renderHook(() => useArrayJoin([], ','));
    expect(result.current).toBe('');
  });

  it('should join array elements with the default separator (comma)', () => {
    const { result } = renderHook(() => useArrayJoin(['one', 'two', 'three']));
    expect(result.current).toBe('one,two,three');
  });

  it('should join array elements with a custom separator', () => {
    const { result } = renderHook(() =>
      useArrayJoin(['one', 'two', 'three'], ' | ')
    );
    expect(result.current).toBe('one | two | three');
  });

  it('should return a single element without separator', () => {
    const { result } = renderHook(() => useArrayJoin(['single']));
    expect(result.current).toBe('single');
  });

  it('should update the joined string if the list changes', () => {
    const { result, rerender } = renderHook(
      props => useArrayJoin(props.list, props.separator),
      {
        initialProps: { list: ['one', 'two'], separator: ',' },
      }
    );
    expect(result.current).toBe('one,two');

    rerender({ list: ['three', 'four'], separator: ',' });
    expect(result.current).toBe('three,four');
  });

  it('should update the joined string if the separator changes', () => {
    const { result, rerender } = renderHook(
      props => useArrayJoin(props.list, props.separator),
      {
        initialProps: { list: ['one', 'two'], separator: ',' },
      }
    );
    expect(result.current).toBe('one,two');

    rerender({ list: ['one', 'two'], separator: ' - ' });
    expect(result.current).toBe('one - two');
  });

  it('should work with non-string elements', () => {
    const { result } = renderHook(() => useArrayJoin([1, 2, 3], ','));
    expect(result.current).toBe('1,2,3');
  });
});
