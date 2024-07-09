import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRandom } from '../use-random';

describe('useRandom', () => {
  it('should initialize with null value', () => {
    const { result } = renderHook(() => useRandom());
    expect(result.current.value).toBeNull();
  });

  it('should generate a random number within range', () => {
    const { result } = renderHook(() => useRandom({ min: 1, max: 10 }));
    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBeGreaterThanOrEqual(1);
    expect(result.current.value).toBeLessThanOrEqual(10);
  });

  it('should generate integer when isInteger is true', () => {
    const { result } = renderHook(() =>
      useRandom({ min: 1, max: 10, isInteger: true }),
    );
    act(() => {
      result.current.generate();
    });
    expect(Number.isInteger(result.current.value)).toBeTruthy();
  });

  it('should reset to default options', () => {
    const { result } = renderHook(() =>
      useRandom({ min: 1, max: 10, isInteger: true }),
    );
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBeNull();
    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBeGreaterThanOrEqual(0);
    expect(result.current.value).toBeLessThanOrEqual(1);
    expect(Number.isInteger(result.current.value)).toBeFalsy();
  });

  it('should set new range', () => {
    const { result } = renderHook(() => useRandom());

    act(() => {
      result.current.setRange(100, 200);
    });

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeGreaterThanOrEqual(100);
    expect(result.current.value).toBeLessThanOrEqual(200);
  });

  it('should toggle integer mode', () => {
    const { result } = renderHook(() => useRandom({ min: 1, max: 10 }));

    act(() => {
      result.current.generate();
    });
    expect(Number.isInteger(result.current.value)).toBeFalsy();

    act(() => {
      result.current.toggleInteger();
    });

    act(() => {
      result.current.generate();
    });
    expect(Number.isInteger(result.current.value)).toBeTruthy();

    act(() => {
      result.current.toggleInteger();
    });

    act(() => {
      result.current.generate();
    });
    expect(Number.isInteger(result.current.value)).toBeFalsy();
  });

  it('should throw an error for invalid range', () => {
    const { result } = renderHook(() => useRandom({ min: 10, max: 1 }));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'useRandom Error:',
      'Min must be less than max',
    );

    consoleSpy.mockRestore();
  });

  it('should handle non-numeric inputs', () => {
    const { result } = renderHook(() =>
      useRandom({
        min: 'a' as unknown as number,
        max: 'b' as unknown as number,
      }),
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'useRandom Error:',
      'Min and max must be numbers',
    );

    consoleSpy.mockRestore();
  });

  it('should memoize returned functions', () => {
    const { result, rerender } = renderHook(() => useRandom());
    const initialResult = result.current;

    rerender();
    expect(result.current.generate).toBe(initialResult.generate);
    expect(result.current.reset).toBe(initialResult.reset);
    expect(result.current.setRange).toBe(initialResult.setRange);
    expect(result.current.toggleInteger).toBe(initialResult.toggleInteger);

    act(() => {
      result.current.generate();
    });

    expect(result.current.generate).toBe(initialResult.generate);
    expect(result.current.reset).toBe(initialResult.reset);
    expect(result.current.setRange).toBe(initialResult.setRange);
    expect(result.current.toggleInteger).toBe(initialResult.toggleInteger);
  });

  it('should generate consistent results with same seed', () => {
    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { result } = renderHook(() => useRandom({ min: 0, max: 100 }));

    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBe(50);

    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBe(50);

    mockRandom.mockRestore();
  });

  it('should round to 4 decimal places for non-integer mode', () => {
    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.12345);
    const { result } = renderHook(() => useRandom({ min: 0, max: 1 }));

    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBe(0.1235);

    mockRandom.mockRestore();
  });

  it('should use provided initial options', () => {
    const { result } = renderHook(() =>
      useRandom({ min: 5, max: 15, isInteger: true }),
    );

    act(() => {
      result.current.generate();
    });
    expect(result.current.value).toBeGreaterThanOrEqual(5);
    expect(result.current.value).toBeLessThanOrEqual(15);
    expect(Number.isInteger(result.current.value)).toBeTruthy();
  });

  it('should handle edge case of min equal to max', () => {
    const { result } = renderHook(() => useRandom({ min: 10, max: 10 }));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'useRandom Error:',
      'Min must be less than max',
    );

    consoleSpy.mockRestore();
  });

  it('should handle very large ranges', () => {
    const { result } = renderHook(() =>
      useRandom({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
    );

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeGreaterThanOrEqual(
      Number.MIN_SAFE_INTEGER,
    );
    expect(result.current.value).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });

  it('should handle very small ranges', () => {
    const { result } = renderHook(() =>
      useRandom({ min: 0, max: Number.EPSILON }),
    );

    act(() => {
      result.current.generate();
    });

    expect(result.current.value).toBeGreaterThanOrEqual(0);
    expect(result.current.value).toBeLessThanOrEqual(Number.EPSILON);
  });
});
