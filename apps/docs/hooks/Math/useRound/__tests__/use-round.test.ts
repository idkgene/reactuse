import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useRound } from '../use-round';

describe('useRound', () => {
  it('should initialize wit default value of 0', () => {
    const { result } = renderHook(() => useRound());
    expect(result.current[0]).toBe(0);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useRound(3.7));
    expect(result.current[0]).toBe(4);
  });

  it('should round down when decimal is less than .5', () => {
    const { result } = renderHook(() => useRound(3.2));
    expect(result.current[0]).toBe(3);
  });

  it('should round up when decimal is .5 or greater', () => {
    const { result } = renderHook(() => useRound(3.5));
    expect(result.current[0]).toBe(4);
  });

  it('should throw error for non-finite initial value', () => {
    expect(() => {
      renderHook(() => useRound(Infinity));
    }).toThrow('Initial value must be a finite number');
  });

  it('should update result when roundNumber is called', () => {
    const { result } = renderHook(() => useRound());
    act(() => {
      result.current[1](5.7);
    });
    expect(result.current[0]).toBe(6);
  });

  it('should throw error when roundNumber is called with non-finite number', () => {
    const { result } = renderHook(() => useRound());
    expect(() => {
      act(() => {
        result.current[1](NaN);
      });
    }).toThrow('Input must be a finite number');
  });

  it('should handle negative numbers correctly', () => {
    const { result } = renderHook(() => useRound(-3.7));
    expect(result.current[0]).toBe(-4);
    act(() => {
      result.current[1](-2.3);
    });
    expect(result.current[0]).toBe(-2);
  });

  it('should handle very large numbers', () => {
    const { result } = renderHook(() =>
      useRound(Number.MAX_SAFE_INTEGER + 0.5),
    );
    expect(result.current[0]).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
});
