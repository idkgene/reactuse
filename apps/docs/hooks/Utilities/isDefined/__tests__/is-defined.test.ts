import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsDefined } from '../is-defined';

describe('useIsDefined', () => {
  it('should return true for defined values', () => {
    const { result } = renderHook(() => useIsDefined(42));
    expect(result.current).toBe(true);
  });

  it('should return false for null', () => {
    const { result } = renderHook(() => useIsDefined(null));
    expect(result.current).toBe(false);
  });

  it('should return false for undefined', () => {
    const { result } = renderHook(() => useIsDefined(undefined));
    expect(result.current).toBe(false);
  });

  it('should return false for functions', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // Empty fn
      });
    const { result } = renderHook(() =>
      useIsDefined(() => {
        // Empty fn
      }),
    );
    expect(result.current).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in useIsDefined: Functions are not supported in useIsDefined',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should handle unexpected errors', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // Empty fn
      });
    const { result } = renderHook(() => {
      try {
        useIsDefined(42);
        throw new Error('Unexpected error');
      } catch (error) {
        // Empty catch block
      }
    });
    expect(result.current).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'An unexpected error occurred in useIsDefined',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should update the value when it changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useIsDefined(value),
      {
        initialProps: { value: 42 as number | null | undefined | string },
      },
    );
    expect(result.current).toBe(true);

    rerender({ value: null });
    expect(result.current).toBe(false);

    rerender({ value: undefined });
    expect(result.current).toBe(false);

    rerender({ value: 'hello' });
    expect(result.current).toBe(true);
  });
});
