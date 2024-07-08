import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useTrunc } from '../use-trunc';

describe('useTrunc', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useTrunc());
    expect(result.current.value).toBe(0);
  });

  it('should initialize with provided value', () => {
    const initialValue = 3.14;
    const { result } = renderHook(() => useTrunc(initialValue));
    expect(result.current.value).toBe(3);
  });

  it('should throw an error for invalid initial value', () => {
    expect(() => useTrunc(NaN)).toThrowError();

    expect(() => useTrunc(Infinity)).toThrowError();

    expect(() => useTrunc(-Infinity)).toThrowError();
  });

  it('should truncate positive numbers correctly', () => {
    const { result } = renderHook(() => useTrunc());
    act(() => {
      result.current.truncate(3.14);
    });
    expect(result.current.value).toBe(3);
  });

  it('should truncate negative numbers correctly', () => {
    const { result } = renderHook(() => useTrunc());
    act(() => {
      result.current.truncate(-3.14);
    });
    expect(result.current.value).toBe(-3);
  });

  it('should handle zero correctly', () => {
    const { result } = renderHook(() => useTrunc());
    act(() => {
      result.current.truncate(0);
    });
    expect(result.current.value).toBe(0);
  });

  it('should throw an error for invalid input', () => {
    const { result } = renderHook(() => useTrunc());

    expect(() => {
      act(() => {
        result.current.truncate(NaN);
      });
    }).toThrowError();

    expect(() => {
      act(() => {
        result.current.truncate(Infinity);
      });
    }).toThrowError();

    expect(() => {
      act(() => {
        result.current.truncate(-Infinity);
      });
    }).toThrowError();
  });
});
