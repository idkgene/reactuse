import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePow } from '../use-pow';

describe('usePow', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePow());
    expect(result.current.base).toBe(0);
    expect(result.current.exponent).toBe(1);
    expect(result.current.result).toBe(0);
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 3 }),
    );
    expect(result.current.base).toBe(2);
    expect(result.current.exponent).toBe(3);
    expect(result.current.result).toBe(8);
  });

  it('should update base', () => {
    const { result } = renderHook(() => usePow());
    act(() => {
      result.current.setBase(3);
    });
    expect(result.current.base).toBe(3);
    expect(result.current.result).toBe(3);
  });

  it('should update exponent', () => {
    const { result } = renderHook(() => usePow({ initialBase: 2 }));
    act(() => {
      result.current.setExponent(3);
    });
    expect(result.current.exponent).toBe(3);
    expect(result.current.result).toBe(8);
  });

  it('should throw error for invalid base', () => {
    const { result } = renderHook(() => usePow());
    expect(() => {
      act(() => {
        result.current.setBase(NaN);
      });
    }).toThrow('base must be a finite number');
  });

  it('should throw error for invalid exponent', () => {
    const { result } = renderHook(() => usePow());
    expect(() => {
      act(() => {
        result.current.setExponent(Infinity);
      });
    }).toThrow('exponent must be a finite number');
  });

  it('should handle zero base', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 0, initialExponent: 5 }),
    );
    expect(result.current.result).toBe(0);
  });

  it('should handle negative base and even exponent', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: -2, initialExponent: 2 }),
    );
    expect(result.current.result).toBe(4);
  });

  it('should handle negative base and odd exponent', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: -2, initialExponent: 3 }),
    );
    expect(result.current.result).toBe(-8);
  });

  it('should handle fractional exponents', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 4, initialExponent: 0.5 }),
    );
    expect(result.current.result).toBe(2);
  });

  it('should handle very large results', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 10, initialExponent: 100 }),
    );
    expect(result.current.result).toBe(1e100);
  });

  it('should update base using function', () => {
    const { result } = renderHook(() => usePow({ initialBase: 2 }));
    act(() => {
      result.current.setBase((prev) => prev * 2);
    });
    expect(result.current.base).toBe(4);
    expect(result.current.result).toBe(4);
  });

  it('should update exponent using function', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 2 }),
    );
    act(() => {
      result.current.setExponent((prev) => prev + 1);
    });
    expect(result.current.exponent).toBe(3);
    expect(result.current.result).toBe(8);
  });

  it('should memoize returned object', () => {
    const { result, rerender } = renderHook(() => usePow());
    const initialResult = result.current;
    rerender();
    expect(result.current).toBe(initialResult);
  });

  it('should memoize setBase and setExponent functions', () => {
    const { result, rerender } = renderHook(() => usePow());
    const initialSetBase = result.current.setBase;
    const initialSetExponent = result.current.setExponent;
    rerender();
    expect(result.current.setBase).toBe(initialSetBase);
    expect(result.current.setExponent).toBe(initialSetExponent);
  });

  it('should handle edge case: 0^0', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 0, initialExponent: 0 }),
    );
    expect(result.current.result).toBe(1); // Математически не определено, но JavaScript возвращает 1
  });

  it('should handle edge case: negative base with fractional exponent', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: -4, initialExponent: 0.5 }),
    );
    expect(result.current.result).toBe(NaN);
  });

  it('should handle very small results', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 0.1, initialExponent: 100 }),
    );
    expect(result.current.result).toBeCloseTo(0, 10);
  });

  it('should update result when base changes', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 3 }),
    );
    expect(result.current.result).toBe(8);
    act(() => {
      result.current.setBase(3);
    });
    expect(result.current.result).toBe(27);
  });

  it('should update result when exponent changes', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 3 }),
    );
    expect(result.current.result).toBe(8);
    act(() => {
      result.current.setExponent(4);
    });
    expect(result.current.result).toBe(16);
  });

  it('should handle multiple updates', () => {
    const { result } = renderHook(() => usePow());
    act(() => {
      result.current.setBase(2);
      result.current.setExponent(3);
    });
    expect(result.current.result).toBe(8);
    act(() => {
      result.current.setBase(3);
      result.current.setExponent(2);
    });
    expect(result.current.result).toBe(9);
  });

  it('should throw error for invalid initial values', () => {
    expect(() => renderHook(() => usePow({ initialBase: NaN }))).toThrow(
      'initialBase must be a finite number',
    );
    expect(() =>
      renderHook(() => usePow({ initialExponent: Infinity })),
    ).toThrow('initialExponent must be a finite number');
  });

  it('should handle precision for fractional results', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 2, initialExponent: 1 / 3 }),
    );
    expect(result.current.result).toBeCloseTo(1.2599, 4);
  });

  it('should perform well with frequent updates', () => {
    const { result } = renderHook(() => usePow());
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      act(() => {
        result.current.setBase(i);
        result.current.setExponent(i % 5);
      });
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(1000);
  });

  it('should return NaN for results that are too large', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 10, initialExponent: 1000 }),
    );
    expect(result.current.result).toBe(NaN);
    expect(console.error).toHaveBeenCalledWith(
      'Error calculating power:',
      expect.any(Error),
    );
  });

  it('should handle very large bases and small exponents', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 1e100, initialExponent: 0.5 }),
    );
    expect(result.current.result).toBe(1e50);
  });

  it('should handle very small bases and large exponents', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: 1e-100, initialExponent: 100 }),
    );
    expect(result.current.result).toBe(1e-10000);
  });

  it('should handle complex numbers result', () => {
    const { result } = renderHook(() =>
      usePow({ initialBase: -1, initialExponent: 0.5 }),
    );
    expect(result.current.result).toBe(NaN);
    expect(console.error).toHaveBeenCalledWith(
      'Error calculating power:',
      expect.any(Error),
    );
  });
});
