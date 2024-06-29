import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePow } from './use-pow';

describe('usePow', () => {
  it('should initialize with the correct initial base and exponent', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 3 }),
    );
    expect(result.current.base).toBe(2);
    expect(result.current.exponent).toBe(3);
  });

  it('should initialize with the default base and exponent when no options are provided', () => {
    const { result } = renderHook(() => usePow());
    expect(result.current.base).toBe(0);
    expect(result.current.exponent).toBe(1);
  });

  it('should set the base correctly', () => {
    const { result } = renderHook(() => usePow());

    act(() => {
      result.current.setBase(5);
    });

    expect(result.current.base).toBe(5);
  });

  it('should set the exponent correctly', () => {
    const { result } = renderHook(() => usePow());

    act(() => {
      result.current.setExponent(4);
    });

    expect(result.current.exponent).toBe(4);
  });

  it('should calculate the power correctly', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 3 }),
    );

    let power = result.current.calculate();
    expect(power).toBe(8);

    act(() => {
      result.current.setBase(3);
      result.current.setExponent(2);
    });

    power = result.current.calculate();
    expect(power).toBe(9);
  });

  it('should return null when the result is not a finite number', () => {
    const { result } = renderHook(() => usePow());

    act(() => {
      result.current.setBase(1);
      result.current.setExponent(Infinity);
    });

    const power = result.current.calculate();
    expect(power).toBeNull();
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => usePow());

    act(() => {
      result.current.setBase(0);
      result.current.setExponent(0);
    });

    const power = result.current.calculate();
    expect(power).toBe(1);
  });
});
