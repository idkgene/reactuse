import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDoubleClick } from './useDoubleClick';

describe('useDoubleClick', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call doubleClick function on double click', () => {
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick));

    act(() => {
      result.current({ detail: 2 } as React.MouseEvent);
    });

    expect(doubleClick).toHaveBeenCalledTimes(1);
  });

  it('should call click function on single click after timeout', () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick, click));

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    expect(click).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(click).toHaveBeenCalledTimes(1);
  });

  it('should not call click function if double clicked within timeout', () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick, click));

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    act(() => {
      result.current({ detail: 2 } as React.MouseEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(click).not.toHaveBeenCalled();
    expect(doubleClick).toHaveBeenCalledTimes(1);
  });

  it('should work with custom timeout', () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() =>
      useDoubleClick(doubleClick, click, { timeout: 300 }),
    );

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(click).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(click).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple clicks correctly', () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick, click));

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
      result.current({ detail: 2 } as React.MouseEvent);
      result.current({ detail: 3 } as React.MouseEvent);
      result.current({ detail: 4 } as React.MouseEvent);
    });

    expect(doubleClick).toHaveBeenCalledTimes(2);
    expect(click).not.toHaveBeenCalled();
  });

  it('should work without click function', () => {
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick));

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(doubleClick).not.toHaveBeenCalled();

    act(() => {
      result.current({ detail: 2 } as React.MouseEvent);
    });

    expect(doubleClick).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on unmount', () => {
    vi.useFakeTimers();
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDoubleClick(doubleClick, click),
    );

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    expect(click).not.toHaveBeenCalled();
    expect(doubleClick).not.toHaveBeenCalled();

    unmount();

    act(() => {
      vi.runAllTimers();
    });

    expect(click).not.toHaveBeenCalled();
    expect(doubleClick).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should handle rapid single clicks correctly', () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick(doubleClick, click));

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current({ detail: 1 } as React.MouseEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(click).toHaveBeenCalledTimes(1);
    expect(doubleClick).not.toHaveBeenCalled();
  });

  it('should be memoized and not change on re-renders', () => {
    const doubleClick = vi.fn();
    const click = vi.fn();
    const { result, rerender } = renderHook(() =>
      useDoubleClick(doubleClick, click),
    );

    const initialCallback = result.current;

    rerender();

    expect(result.current).toBe(initialCallback);
  });

  it('should update when dependencies change', () => {
    const doubleClick1 = vi.fn();
    const doubleClick2 = vi.fn();
    const click = vi.fn();
    const { result, rerender } = renderHook(
      ({ doubleClick }) => useDoubleClick(doubleClick, click),
      { initialProps: { doubleClick: doubleClick1 } },
    );

    const initialCallback = result.current;

    rerender({ doubleClick: doubleClick2 });

    expect(result.current).not.toBe(initialCallback);
  });
});
