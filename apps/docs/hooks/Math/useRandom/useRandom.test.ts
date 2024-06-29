import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRandom, random } from './useRandom';

describe('useRandom', () => {
  it('should generate a random number between 0 and 1 by default', () => {
    const { result } = renderHook(() => useRandom());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBeGreaterThanOrEqual(0);
    expect(result.current[0]).toBeLessThan(1);
  });

  it('should generate a random number within the specified range', () => {
    const { result } = renderHook(() => useRandom({ min: 10, max: 20 }));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBeGreaterThanOrEqual(10);
    expect(result.current[0]).toBeLessThan(20);
  });

  it('should generate an integer when isInteger is true', () => {
    const { result } = renderHook(() =>
      useRandom({ min: 1, max: 10, isInteger: true }),
    );
    act(() => {
      result.current[1]();
    });
    expect(Number.isInteger(result.current[0])).toBe(true);
  });

  it('should handle error when min is greater than or equal to max', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useRandom({ min: 10, max: 5 }));
    act(() => {
      const generatedValue = result.current[1]();
      expect(generatedValue).toBeNull();
    });
    expect(result.current[0]).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in useRandom:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });

  it('should memoize the generate function', () => {
    const { result, rerender } = renderHook(() => useRandom());
    const initialGenerate = result.current[1];
    rerender();
    expect(result.current[1]).toBe(initialGenerate);
  });

  it('should export random as a function', () => {
    expect(typeof random).toBe('function');
  });
});
