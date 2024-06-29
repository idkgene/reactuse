import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useAbs } from '../useAbs';

const createGetter = (value: number) => () => value;

describe('useAbs', () => {
  it('should return absolute value of a positive number', () => {
    const { result } = renderHook(() => useAbs(42));
    expect(result.current).toBe(42);
  });

  it('should return absolute value of a negative number', () => {
    const { result } = renderHook(() => useAbs(-42));
    expect(result.current).toBe(42);
  });

  it('should return zero for zero input', () => {
    const { result } = renderHook(() => useAbs(0));
    expect(result.current).toBe(0);
  });

  it('should return absolute value from a getter function', () => {
    const { result } = renderHook(() => useAbs(createGetter(-42)));
    expect(result.current).toBe(42);
  });

  it('should update absolute value when the input changes (primitive number)', () => {
    let number = -42;
    const { result, rerender } = renderHook(() => useAbs(number));

    expect(result.current).toBe(42);

    act(() => {
      number = -84;
      rerender();
    });

    expect(result.current).toBe(84);

    act(() => {
      number = 21;
      rerender();
    });

    expect(result.current).toBe(21);
  });

  it('should update absolute value when the getter function changes', () => {
    let number = -42;
    const getter = () => number;
    const { result, rerender } = renderHook(() => useAbs(getter));

    expect(result.current).toBe(42);

    act(() => {
      number = -84;
      rerender();
    });

    expect(result.current).toBe(84);

    act(() => {
      number = 21;
      rerender();
    });

    expect(result.current).toBe(21);
  });

  it('should update absolute value when the getter function itself changes', () => {
    let getter = createGetter(-42);
    const { result, rerender } = renderHook(() => useAbs(getter));

    expect(result.current).toBe(42);

    act(() => {
      getter = createGetter(-84);
      rerender();
    });

    expect(result.current).toBe(84);

    act(() => {
      getter = createGetter(21);
      rerender();
    });

    expect(result.current).toBe(21);
  });
});
