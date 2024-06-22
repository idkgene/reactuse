import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';
import { expect, it, describe } from 'vitest';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with a given initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('should increment the count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.inc();
    });
    expect(result.current.count).toBe(1);
  });

  it('should decrement the count', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.dec();
    });
    expect(result.current.count).toBe(4);
  });

  it('should increment the count by a custom delta', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.inc(3);
    });
    expect(result.current.count).toBe(8);
  });

  it('should decrement the count by a custom delta', () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.dec(4);
    });
    expect(result.current.count).toBe(6);
  });

  it('should set the count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.set(10);
    });
    expect(result.current.count).toBe(10);
  });

  it('should reset the count to the initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.inc();
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });

  it('should reset the count to a custom value', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.inc();
      result.current.reset(8);
    });
    expect(result.current.count).toBe(8);
  });

  it('should respect min and max options', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0, max: 10 }));

    act(() => {
      result.current.inc(10);
    });
    expect(result.current.count).toBe(10);

    act(() => {
      result.current.dec(15);
    });
    expect(result.current.count).toBe(0);
  });

  it('should not go below min value', () => {
    const { result } = renderHook(() => useCounter(5, { min: 3 }));

    act(() => {
      result.current.dec(5);
    });
    expect(result.current.count).toBe(3);
  });

  it('should not go above max value', () => {
    const { result } = renderHook(() => useCounter(5, { max: 7 }));

    act(() => {
      result.current.inc(5);
    });
    expect(result.current.count).toBe(7);
  });

  it('should set to min if set value is below min', () => {
    const { result } = renderHook(() => useCounter(5, { min: 3 }));

    act(() => {
      result.current.set(2);
    });
    expect(result.current.count).toBe(3);
  });

  it('should set to max if set value is above max', () => {
    const { result } = renderHook(() => useCounter(5, { max: 7 }));

    act(() => {
      result.current.set(8);
    });
    expect(result.current.count).toBe(7);
  });

  it('should return the current count with the get method', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.get()).toBe(5);
  });

  it('should check the reset with a value below `min`', () => {
    const { result } = renderHook(() => useCounter(5, { min: 3 }));

    act(() => {
      result.current.reset(2);
    });
  });

  it('should check the reset with a value above `max`', () => {
    const { result } = renderHook(() => useCounter(5, { max: 7 }));

    act(() => {
      result.current.reset(8);
    });
  });
});
