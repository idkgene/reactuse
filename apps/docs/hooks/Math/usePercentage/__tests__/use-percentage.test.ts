import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { percentage, type UsePercentageOptions } from '../use-percentage';

describe('usePercentage', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => percentage());
    expect(result.current.value).toBe(0);
    expect(result.current.getAbsolute()).toBe(0);
  });

  it('should initialize with custom values', () => {
    const options: UsePercentageOptions = { initialValue: 50, total: 200 };
    const { result } = renderHook(() => percentage(options));
    expect(result.current.value).toBe(50);
    expect(result.current.getAbsolute()).toBe(100);
  });

  it('should throw error for invalid initial value', () => {
    expect(() => {
      renderHook(() => percentage({ initialValue: 101 }));
    }).toThrow('Percentage must be a finite number between 0 and 100');
  });

  it('should throw error for invalid total', () => {
    expect(() => {
      renderHook(() => percentage({ total: 0 }));
    }).toThrow('Total must be a finite number greater than 0');
  });

  it('should update percentage', () => {
    const { result } = renderHook(() => percentage());
    act(() => {
      result.current.setPercentage(75);
    });
    expect(result.current.value).toBe(75);
    expect(result.current.getAbsolute()).toBe(75);
  });

  it('should throw error when setting invalid percentage', () => {
    const { result } = renderHook(() => percentage());
    expect(() => {
      act(() => {
        result.current.setPercentage(-10);
      });
    }).toThrow('Percentage must be a finite number between 0 and 100');
  });

  it('should update percentage using function', () => {
    const { result } = renderHook(() => percentage({ initialValue: 50 }));
    act(() => {
      result.current.setPercentage((prev) => prev + 10);
    });
    expect(result.current.value).toBe(60);
  });

  it('should calculate absolute value correctly', () => {
    const { result } = renderHook(() =>
      percentage({ initialValue: 25, total: 400 }),
    );
    expect(result.current.getAbsolute()).toBe(100);
  });

  it('should recalculate absolute value when total changes', () => {
    const { result, rerender } = renderHook(
      (props: UsePercentageOptions) => percentage(props),
      { initialProps: { initialValue: 50, total: 100 } },
    );
    expect(result.current.getAbsolute()).toBe(50);

    rerender({ initialValue: 50, total: 200 });
    expect(result.current.getAbsolute()).toBe(100);
  });

  it('should memoize returned object', () => {
    const { result, rerender } = renderHook(() => percentage());
    const initialResult = result.current;
    rerender();
    expect(result.current).toBe(initialResult);
  });

  it('should update memoized object when value changes', () => {
    const { result } = renderHook(() => percentage());
    const initialResult = result.current;
    act(() => {
      result.current.setPercentage(50);
    });
    expect(result.current).not.toBe(initialResult);
  });
});
