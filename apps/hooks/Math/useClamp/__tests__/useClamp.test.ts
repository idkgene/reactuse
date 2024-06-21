import { renderHook } from '@testing-library/react';
import { useClamp } from '../useClamp';

describe('useClamp', () => {
  test('should clamp a value between min and max', () => {
    const { result } = renderHook(() => useClamp(5, 0, 10));
    expect(result.current).toBe(5);
  });

  test('should clamp a value to the minimum', () => {
    const { result } = renderHook(() => useClamp(-5, 0, 10));
    expect(result.current).toBe(0);
  });

  test('should clamp a value to the maximum', () => {
    const { result } = renderHook(() => useClamp(15, 0, 10));
    expect(result.current).toBe(10);
  });

  test('should handle min and max as getter functions', () => {
    const min = () => 2;
    const max = () => 8;
    const { result } = renderHook(() => useClamp(5, min, max));
    expect(result.current).toBe(5);
  });

  test('should handle value as a getter function', () => {
    const value = () => 7;
    const { result } = renderHook(() => useClamp(value, 0, 10));
    expect(result.current).toBe(7);
  });

  test('should update the clamped value when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useClamp(value, 0, 10),
      {
        initialProps: { value: 5 },
      }
    );

    expect(result.current).toBe(5);

    rerender({ value: -2 });
    expect(result.current).toBe(0);

    rerender({ value: 12 });
    expect(result.current).toBe(10);
  });

  test('should update the clamped value when min changes', () => {
    const { result, rerender } = renderHook(({ min }) => useClamp(5, min, 10), {
      initialProps: { min: 0 },
    });

    expect(result.current).toBe(5);

    rerender({ min: 6 });
    expect(result.current).toBe(6);
  });

  test('should update the clamped value when max changes', () => {
    const { result, rerender } = renderHook(({ max }) => useClamp(5, 0, max), {
      initialProps: { max: 10 },
    });

    expect(result.current).toBe(5);

    rerender({ max: 4 });
    expect(result.current).toBe(4);
  });

  test('should memoize the clamped value', () => {
    const value = jest.fn(() => 5);
    const min = jest.fn(() => 0);
    const max = jest.fn(() => 10);

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
});
