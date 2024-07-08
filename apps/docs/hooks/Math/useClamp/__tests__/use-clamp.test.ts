import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useClamp } from '../use-clamp';

describe('useClamp', () => {
  it('should clamp a value between min and max', () => {
    const { result } = renderHook(() => useClamp(5, 0, 10));
    expect(result.current).toBe(5);
  });

  it('should clamp a value to the minimum', () => {
    const { result } = renderHook(() => useClamp(-5, 0, 10));
    expect(result.current).toBe(0);
  });

  it('should clamp a value to the maximum', () => {
    const { result } = renderHook(() => useClamp(15, 0, 10));
    expect(result.current).toBe(10);
  });

  it('should handle min and max as getter functions', () => {
    const min = (): number => 2;
    const max = (): number => 8;
    const { result } = renderHook(() => useClamp(5, min, max));
    expect(result.current).toBe(5);
  });

  it('should handle value as a getter function', () => {
    const value = (): number => 7;
    const { result } = renderHook(() => useClamp(value, 0, 10));
    expect(result.current).toBe(7);
  });

  it('should update the clamped value when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useClamp(value, 0, 10),
      {
        initialProps: { value: 5 },
      },
    );

    expect(result.current).toBe(5);

    rerender({ value: -2 });
    expect(result.current).toBe(0);

    rerender({ value: 12 });
    expect(result.current).toBe(10);
  });

  it('should update the clamped value when min changes', () => {
    const { result, rerender } = renderHook(({ min }) => useClamp(5, min, 10), {
      initialProps: { min: 0 },
    });

    expect(result.current).toBe(5);

    rerender({ min: 6 });
    expect(result.current).toBe(6);
  });

  it('should update the clamped value when max changes', () => {
    const { result, rerender } = renderHook(({ max }) => useClamp(5, 0, max), {
      initialProps: { max: 10 },
    });

    expect(result.current).toBe(5);

    rerender({ max: 4 });
    expect(result.current).toBe(4);
  });

  it('should memoize the clamped value', () => {
    const value = vi.fn(() => 5);
    const min = vi.fn(() => 0);
    const max = vi.fn(() => 10);

    const { result, rerender } = renderHook(() => useClamp(value, min, max));

    expect(result.current).toBe(5);
    expect(value).toHaveBeenCalledTimes(1);
    expect(min).toHaveBeenCalledTimes(1);
    expect(max).toHaveBeenCalledTimes(1);

    rerender();

    expect(result.current).toBe(5);
    expect(value).toHaveBeenCalledTimes(1);
    expect(min).toHaveBeenCalledTimes(1);
    expect(max).toHaveBeenCalledTimes(1);
  });

  it('should throw for non-number value', () => {
    expect(() => {
      renderHook(() => useClamp('5' as unknown as number, 0, 10));
    }).toThrow('Invalid value: 5. Expected a finite number.');
  });

  it('should throw for NaN value', () => {
    expect(() => {
      renderHook(() => useClamp(NaN, 0, 10));
    }).toThrow('Invalid value: NaN. Expected a finite number.');
  });

  it('should throw for Infinity value', () => {
    expect(() => {
      renderHook(() => useClamp(Infinity, 0, 10));
    }).toThrow('Invalid value: Infinity. Expected a finite number.');
  });

  it('should throw for -Infinity value', () => {
    expect(() => {
      renderHook(() => useClamp(-Infinity, 0, 10));
    }).toThrow('Invalid value: -Infinity. Expected a finite number.');
  });

  it('should not throw for valid number value', () => {
    expect(() => {
      renderHook(() => useClamp(5, 0, 10));
    }).not.toThrow();
  });

  it('should throw for non-number min', () => {
    expect(() => {
      renderHook(() => useClamp(5, '0' as unknown as number, 10));
    }).toThrow('Invalid min: 0. Expected a finite number.');
  });

  it('should throw for NaN min', () => {
    expect(() => {
      renderHook(() => useClamp(5, NaN, 10));
    }).toThrow('Invalid min: NaN. Expected a finite number.');
  });

  it('should throw for Infinity min', () => {
    expect(() => {
      renderHook(() => useClamp(5, Infinity, 10));
    }).toThrow('Invalid min: Infinity. Expected a finite number.');
  });

  it('should throw for non-number max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 0, '10' as unknown as number));
    }).toThrow('Invalid max: 10. Expected a finite number.');
  });

  it('should throw for NaN max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 0, NaN));
    }).toThrow('Invalid max: NaN. Expected a finite number.');
  });

  it('should throw for Infinity max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 0, Infinity));
    }).toThrow('Invalid max: Infinity. Expected a finite number.');
  });

  it('should throw when min is greater than max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 10, 0));
    }).toThrow('Invalid range: min (10) is greater than max (0).');
  });

  it('should not throw when min equals max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 10, 10));
    }).not.toThrow();
  });

  it('should not throw when min is less than max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 0, 10));
    }).not.toThrow();
  });

  it('should handle edge case with very close min and max', () => {
    expect(() => {
      renderHook(() => useClamp(5, 1e-10, 1e-9));
    }).not.toThrow();
  });
});
