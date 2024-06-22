import { renderHook, act } from '@testing-library/react';
import { useHover } from '../useHover';
import { expect, it, describe, vi } from 'vitest';

describe('useHover', () => {
  it('should return false initially', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>),
    );

    expect(result.current).toBe(false);
  });

  it('should return true when the element is hovered', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when the element is not hovered', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
      ref.current.dispatchEvent(new MouseEvent('mouseleave'));
    });

    expect(result.current).toBe(false);
  });

  it('should call onHoverChange callback with true when the element is hovered', () => {
    const ref = { current: document.createElement('div') };
    const onHoverChange = vi.fn();
    renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>, { onHoverChange }),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(onHoverChange).toHaveBeenCalledWith(true);
  });

  it('should call onHoverChange callback with false when the element is not hovered', () => {
    const ref = { current: document.createElement('div') };
    const onHoverChange = vi.fn();
    renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>, { onHoverChange }),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
      ref.current.dispatchEvent(new MouseEvent('mouseleave'));
    });

    expect(onHoverChange).toHaveBeenCalledWith(false);
  });

  it('should not update the hover state if shouldHandleHover returns false', () => {
    const ref = { current: document.createElement('div') };
    const shouldHandleHover = vi.fn().mockReturnValue(false);
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>, { shouldHandleHover }),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current).toBe(false);
    expect(shouldHandleHover).toHaveBeenCalledWith(
      true,
      expect.any(MouseEvent),
    );
  });

  it('should update the hover state if shouldHandleHover returns true', () => {
    const ref = { current: document.createElement('div') };
    const shouldHandleHover = vi.fn().mockReturnValue(true);
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>, { shouldHandleHover }),
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current).toBe(true);
    expect(shouldHandleHover).toHaveBeenCalledWith(
      true,
      expect.any(MouseEvent),
    );
  });

  it('should not throw an error when ref.current is null', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useHover(ref as React.RefObject<HTMLDivElement>),
    );

    expect(result.current).toBe(false);
  });
});
