import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useBreakpoint } from '../use-breakpoint';

function resizeWindow(width: number) {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

describe('useBreakpoint', () => {
  const initialBreakpoint = 768;

  it('should return the initial window width and crossed status correctly', () => {
    resizeWindow(800);
    const { result } = renderHook(() => useBreakpoint(initialBreakpoint));

    expect(result.current.windowWidth).toBe(800);
    expect(result.current.isBreakpointCrossed).toBe(true);
  });

  it('should update the window width and crossed status on window resize', () => {
    const { result } = renderHook(() => useBreakpoint(initialBreakpoint));

    act(() => {
      resizeWindow(500);
    });

    expect(result.current.windowWidth).toBe(500);
    expect(result.current.isBreakpointCrossed).toBe(false);

    act(() => {
      resizeWindow(900);
    });

    expect(result.current.windowWidth).toBe(900);
    expect(result.current.isBreakpointCrossed).toBe(true);
  });

  it('should not update the window width or crossed status if the breakpoint does not change', () => {
    const { result, rerender } = renderHook(({ bp }) => useBreakpoint(bp), {
      initialProps: { bp: initialBreakpoint },
    });

    act(() => {
      resizeWindow(900);
    });

    const initialState = { ...result.current };

    rerender({ bp: initialBreakpoint });

    expect(result.current).toEqual(initialState);

    act(() => {
      resizeWindow(700);
    });

    const updatedState = { ...result.current };

    rerender({ bp: initialBreakpoint });

    expect(result.current).toEqual(updatedState);
  });
});
