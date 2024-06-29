import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSqrt } from './useSqrt';

describe('useSqrt', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useSqrt());
    expect(result.current.value).toBe(0);
    expect(result.current.calculate()).toBe(0);
  });

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useSqrt({ initialValue: 16 }));
    expect(result.current.value).toBe(16);
    expect(result.current.calculate()).toBe(4);
  });

  it('should set value correctly', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(25);
    });
    expect(result.current.value).toBe(25);
    expect(result.current.calculate()).toBe(5);
  });

  it('should handle negative values', () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(-4);
    });
    expect(result.current.value).toBe(-4);
    expect(result.current.calculate()).toBe(null);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in useSqrt:',
      new Error('Cannot calculate square root of a negative number'),
    );
    consoleSpy.mockRestore();
  });

  it('should calculate square root correctly for various values', () => {
    const { result } = renderHook(() => useSqrt());
    const testCases = [0, 1, 4, 9, 16, 25, 100];

    testCases.forEach((testCase) => {
      act(() => {
        result.current.setValue(testCase);
      });
      expect(result.current.calculate()).toBe(Math.sqrt(testCase));
    });
  });
});
