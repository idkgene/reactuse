import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useCloned, cloneFnJSON } from '../use-cloned';

describe('cloneFnJSON', () => {
  it('should create a deep clone of the input object', () => {
    const source = { count: 0, nested: { value: 'hello' } };
    const cloned = cloneFnJSON(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
  });
});

describe('useCloned', () => {
  it('should create a deep clone of the source object', () => {
    const source = { count: 0, nested: { value: 'hello' } };
    const { result } = renderHook(() => useCloned(source));

    expect(result.current.cloned?.current).toEqual(source);
    expect(result.current.cloned?.current).not.toBe(source);
  });

  it('should synchronize the cloned object with the source object', () => {
    let source = { count: 0 };
    const { result, rerender } = renderHook(() => useCloned(source));

    expect(result.current.cloned?.current.count).toBe(0);

    source = { count: 1 };
    rerender();

    expect(result.current.cloned?.current.count).toBe(1);
  });

  it('should use the provided clone function', () => {
    const source = { count: 0 };
    const customClone = (obj: any) => ({ ...obj, custom: true });
    const { result } = renderHook(() =>
      useCloned(source, { clone: customClone }),
    );

    expect(result.current.cloned?.current.custom).toBe(true);
  });

  it('should manually synchronize the cloned object when the manual option is true', () => {
    let source = { count: 0 };
    const { result, rerender } = renderHook(() =>
      useCloned(source, { manual: true }),
    );

    expect(result.current.cloned?.current.count).toBe(0);

    source = { count: 1 };
    rerender();

    expect(result.current.cloned?.current.count).toBe(0);

    act(() => {
      result.current.sync();
    });

    expect(result.current.cloned?.current.count).toBe(1);
  });
});
