import { renderHook } from '@testing-library/react';
import { usePrecision } from '../usePrecision';

describe('usePrecision', () => {
  it('initializes formattedValue correctly based on initial value and precision', () => {
    const { result } = renderHook(() => usePrecision({ value: 3.14159265, precision: 2 }));
    expect(result.current).toBe(3.14);
  });

  it('updates formattedValue when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, precision }) => usePrecision({ value, precision }),
      {
        initialProps: { value: 3.14159265, precision: 2 }
      }
    );

    expect(result.current).toBe(3.14);

    rerender({ value: 2.71828182, precision: 2 });
    expect(result.current).toBe(2.72);
  });

  it('updates formattedValue when precision changes', () => {
    const { result, rerender } = renderHook(
      ({ value, precision }) => usePrecision({ value, precision }),
      {
        initialProps: { value: 3.14159265, precision: 2 }
      }
    );

    expect(result.current).toBe(3.14);

    // Change the precision
    rerender({ value: 3.14159265, precision: 3 });
    expect(result.current).toBe(3.142);
  });

  it('updates formattedValue when both value and precision change', () => {
    const { result, rerender } = renderHook(
      ({ value, precision }) => usePrecision({ value, precision }),
      {
        initialProps: { value: 3.14159265, precision: 2 }
      }
    );

    expect(result.current).toBe(3.14);

    // Change both the value and the precision
    rerender({ value: 2.71828182, precision: 3 });
    expect(result.current).toBe(2.718);
  });

  it('handles large precision values', () => {
    const { result } = renderHook(() => usePrecision({ value: 3.14159265, precision: 5 }));
    expect(result.current).toBe(3.14159);
  });

  it('handles zero precision', () => {
    const { result } = renderHook(() => usePrecision({ value: 3.14159265, precision: 0 }));
    expect(result.current).toBe(3);
  });

  it('handles negative values correctly', () => {
    const { result } = renderHook(() => usePrecision({ value: -3.14159265, precision: 2 }));
    expect(result.current).toBe(-3.14);
  });
});