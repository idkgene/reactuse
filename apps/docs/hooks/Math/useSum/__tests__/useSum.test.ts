import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useSum } from '../useSum';

describe('useSum', () => {
  it('should return the sum of an array of numbers', () => {
    const { result } = renderHook(() => useSum([1, 2, 3, 4]));
    expect(result.current).toBe(10);
  });

  it('should return 0 for an empty array', () => {
    const { result } = renderHook(() => useSum([]));
    expect(result.current).toBe(0);
  });

  it('should update the sum when the array changes', () => {
    const { result, rerender } = renderHook(({ array }) => useSum(array), {
      initialProps: { array: [1, 2, 3] },
    });

    expect(result.current).toBe(6);

    rerender({ array: [4, 5, 6] });
    expect(result.current).toBe(15);
  });

  it('should log an error if input is not an array', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderHook(() => useSum('invalid' as any as number[]));
    expect(consoleSpy).toHaveBeenCalledWith('useSum: Input must be an array');
    consoleSpy.mockRestore();
  });

  it('should log an error if array contains non-number values', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderHook(() => useSum([1, 2, 'invalid' as any]));
    expect(consoleSpy).toHaveBeenCalledWith(
      'useSum: Array must contain only numbers',
    );
    consoleSpy.mockRestore();
  });
});
