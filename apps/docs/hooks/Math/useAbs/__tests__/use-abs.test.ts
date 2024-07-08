import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { type Resolvable, useAbs } from '../use-abs';

describe('useAbs', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the absolute value of a positive number', () => {
    const { result } = renderHook(() => useAbs(5));
    expect(result.current).toBe(5);
  });

  it('should return the absolute value of a negative number', () => {
    const { result } = renderHook(() => useAbs(-5));
    expect(result.current).toBe(5);
  });

  it('should handle zero', () => {
    const { result } = renderHook(() => useAbs(0));
    expect(result.current).toBe(0);
  });

  it('should resolve and return the absolute value of a function returning a number', () => {
    const { result } = renderHook(() => useAbs(() => -10));
    expect(result.current).toBe(10);
  });

  it('should update when the value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useAbs(value), {
      initialProps: { value: 5 },
    });

    expect(result.current).toBe(5);

    rerender({ value: -8 });
    expect(result.current).toBe(8);
  });

  it('should throw an error when value is not a number', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    expect(() => {
      renderHook(() => useAbs('not a number' as unknown as Resolvable<number>));
    }).toThrow('Failed to resolve or calculate absolute value');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in useAbs:',
      expect.any(Error),
    );
  });

  it('should throw an error when function resolves to non-number', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    expect(() => {
      renderHook(() => useAbs(() => 'not a number' as unknown as number));
    }).toThrow('Failed to resolve or calculate absolute value');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in useAbs:',
      expect.any(Error),
    );
  });

  it('should handle function that throws an error', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const throwingFunction = (): never => {
      throw new Error('Test error');
    };

    expect(() => {
      renderHook(() => useAbs(throwingFunction));
    }).toThrow('Failed to resolve or calculate absolute value');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in useAbs:',
      expect.any(Error),
    );
  });
});
