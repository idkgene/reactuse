import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useTrunc } from '../useTrunc';

describe('useTrunc', () => {
  it('should initialize with 0', () => {
    const { result } = renderHook(() => useTrunc());
    expect(result.current[0]).toBe(0);
  });

  it('should truncate a positive number correctly', () => {
    const { result } = renderHook(() => useTrunc());
    const [, truncateNumber] = result.current;

    act(() => {
      truncateNumber(3.7);
    });

    expect(result.current[0]).toBe(3);
  });

  it('should truncate a negative number correctly', () => {
    const { result } = renderHook(() => useTrunc());
    const [, truncateNumber] = result.current;

    act(() => {
      truncateNumber(-2.3);
    });

    expect(result.current[0]).toBe(-2);
  });

  it('should log an error if input is not a number', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useTrunc());
    const [, truncateNumber] = result.current;

    act(() => {
      truncateNumber('invalid' as any);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "useTrunc: Input must be a number otherwise it'll return NaN",
    );
    consoleSpy.mockRestore();
  });
});
