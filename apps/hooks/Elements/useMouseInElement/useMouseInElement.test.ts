import { renderHook, act } from '@testing-library/react';
import { useMouseInElement } from './useMouseInElement';
import { expect, it, describe, vi } from 'vitest';

describe('useMouseInElement', () => {
  it('should initialize state correctly', () => {
    const { result } = renderHook(() =>
      useMouseInElement({ current: null } as React.RefObject<HTMLElement>),
    );
    expect(result.current).toEqual({
      x: 0,
      y: 0,
      elementX: 0,
      elementY: 0,
      elementPositionX: 0,
      elementPositionY: 0,
      elementHeight: 0,
      elementWidth: 0,
      isOutside: true,
    });
  });

  it('should update state on mousemove', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useMouseInElement(ref, { handleOutside: true }),
    );

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      ref.current.getBoundingClientRect = vi.fn(() => ({
        x: 50,
        y: 50,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        right: 150,
        bottom: 150,
        toJSON: () => null,
      }));
      document.dispatchEvent(event);
    });

    expect(result.current).toEqual({
      x: 100,
      y: 100,
      elementX: 50,
      elementY: 50,
      elementPositionX: 50,
      elementPositionY: 50,
      elementHeight: 100,
      elementWidth: 100,
      isOutside: false,
    });
  });

  it('should handle outside events correctly', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useMouseInElement(ref, { handleOutside: true }),
    );

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 10,
      });
      ref.current.getBoundingClientRect = vi.fn(() => ({
        x: 0,
        y: 0,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        right: 150,
        bottom: 150,
        toJSON: () => null,
      })) as () => DOMRect;

      expect(result.current.isOutside).toBe(true);
    });
  });

  it('should not handle outside events when handleOutside is false', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useMouseInElement(ref, { handleOutside: false }),
    );

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 10,
      });
      ref.current.getBoundingClientRect = vi.fn(() => ({
        x: 0,
        y: 0,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        right: 150,
        bottom: 150,
        toJSON: () => null,
      })) as () => DOMRect;
      document.dispatchEvent(event);
    });

    expect(result.current.isOutside).toBe(false);
  });

  it('should return correct element position', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useMouseInElement(ref, { handleOutside: true }),
    );

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      ref.current.getBoundingClientRect = vi.fn(() => ({
        x: 0,
        y: 0,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        right: 150,
        bottom: 150,
        toJSON: () => null,
      })) as () => DOMRect;
      document.dispatchEvent(event);
    });

    expect(result.current.elementPositionX).toBe(50);
    expect(result.current.elementPositionY).toBe(50);
  });

  it('should remove event listener on unmount', () => {
    const ref = { current: document.createElement('div') };
    const { result, unmount } = renderHook(() => useMouseInElement(ref));

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      ref.current.getBoundingClientRect = vi.fn(() => ({
        x: 0,
        y: 0,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        right: 150,
        bottom: 150,
        toJSON: () => null,
      })) as () => DOMRect;
      document.dispatchEvent(event);
    });

    unmount();

    expect(result.current.isOutside).toBe(false);
  });
});
