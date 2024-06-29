import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useRound } from '../useRound';

describe('useRound', () => {
  it('should initialize with 0', () => {
    const { result } = renderHook(() => useRound());
    expect(result.current[0]).toBe(0);
  });

  it('should round a positive number correctly', () => {
    const { result } = renderHook(() => useRound());
    const [, roundNumber] = result.current;

    act(() => {
      roundNumber(3.4);
    });

    expect(result.current[0]).toBe(3);
  });

  it('should round a negative number correctly', () => {
    const { result } = renderHook(() => useRound());
    const [, roundNumber] = result.current;

    act(() => {
      roundNumber(-2.7);
    });

    expect(result.current[0]).toBe(-3);
  });

  it('should log an error if input is not a number', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useRound());
    const [, roundNumber] = result.current;

    act(() => {
      roundNumber('invalid' as any);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "useRound: Input must be a number otherwise it'll return NaN",
    );
    consoleSpy.mockRestore();
  });
});
