import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useKeyModifier,
  type KeyModifier,
  type UseKeyModifierOptions,
} from './useKeyModifier';

describe('useKeyModifier', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with the default state', () => {
    const { result } = renderHook(() => useKeyModifier('Shift'));
    expect(result.current).toBe(null);
  });

  it('should initialize with the provided initial state', () => {
    const { result } = renderHook(() =>
      useKeyModifier('Shift', { initial: true }),
    );
    expect(result.current).toBe(true);
  });

  it('should add event listeners for default events', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useKeyModifier('Shift'));
    expect(addEventListenerSpy).toHaveBeenCalledTimes(4);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mouseup',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
  });

  it('should add event listeners for custom events', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() =>
      useKeyModifier('Shift', { events: ['mousedown', 'keyup'] }),
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
  });

  it('should remove event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useKeyModifier('Shift'));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(4);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mouseup',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
  });

  it('should update state when modifier key is pressed', () => {
    const { result } = renderHook(() => useKeyModifier('Shift'));
    act(() => {
      const event = new KeyboardEvent('keydown', { shiftKey: true });
      Object.defineProperty(event, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(true);
  });

  it('should update state when modifier key is released', () => {
    const { result } = renderHook(() => useKeyModifier('Shift'));
    act(() => {
      const pressEvent = new KeyboardEvent('keydown', { shiftKey: true });
      Object.defineProperty(pressEvent, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(pressEvent);
    });
    expect(result.current).toBe(true);

    act(() => {
      const releaseEvent = new KeyboardEvent('keyup', { shiftKey: false });
      Object.defineProperty(releaseEvent, 'getModifierState', {
        value: () => false,
      });
      window.dispatchEvent(releaseEvent);
    });
    expect(result.current).toBe(false);
  });

  it('should handle mouse events', () => {
    const { result } = renderHook(() => useKeyModifier('Control'));
    act(() => {
      const mouseDownEvent = new MouseEvent('mousedown', { ctrlKey: true });
      Object.defineProperty(mouseDownEvent, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(mouseDownEvent);
    });
    expect(result.current).toBe(true);

    act(() => {
      const mouseUpEvent = new MouseEvent('mouseup', { ctrlKey: false });
      Object.defineProperty(mouseUpEvent, 'getModifierState', {
        value: () => false,
      });
      window.dispatchEvent(mouseUpEvent);
    });
    expect(result.current).toBe(false);
  });

  it('should work with different modifiers', () => {
    const modifiers: KeyModifier[] = [
      'Alt',
      'AltGraph',
      'CapsLock',
      'Control',
      'Fn',
      'FnLock',
      'Meta',
      'NumLock',
      'ScrollLock',
      'Shift',
      'Symbol',
      'SymbolLock',
    ];

    modifiers.forEach((modifier) => {
      const { result } = renderHook(() => useKeyModifier(modifier));
      act(() => {
        const event = new KeyboardEvent('keydown');
        Object.defineProperty(event, 'getModifierState', {
          value: () => true,
        });
        window.dispatchEvent(event);
      });
      expect(result.current).toBe(true);
    });
  });

  it('should not update state for non-specified events', () => {
    const { result } = renderHook(() =>
      useKeyModifier('Shift', { events: ['keydown'] }),
    );
    act(() => {
      const mouseEvent = new MouseEvent('mousedown', { shiftKey: true });
      Object.defineProperty(mouseEvent, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(mouseEvent);
    });
    expect(result.current).toBe(null);
  });

  it('should handle rapid key presses and releases', () => {
    const { result } = renderHook(() => useKeyModifier('Shift'));
    for (let i = 0; i < 10; i++) {
      act(() => {
        const pressEvent = new KeyboardEvent('keydown', { shiftKey: true });
        Object.defineProperty(pressEvent, 'getModifierState', {
          value: () => true,
        });
        window.dispatchEvent(pressEvent);

        const releaseEvent = new KeyboardEvent('keyup', { shiftKey: false });
        Object.defineProperty(releaseEvent, 'getModifierState', {
          value: () => false,
        });
        window.dispatchEvent(releaseEvent);
      });
    }
    expect(result.current).toBe(false);
  });

  it('should update correctly when options change', () => {
    const { result, rerender } = renderHook(
      (props: {
        modifier: KeyModifier;
        options?: UseKeyModifierOptions<boolean | null>;
      }) => useKeyModifier(props.modifier, props.options),
      { initialProps: { modifier: 'Shift' } },
    );

    expect(result.current).toBe(null);

    rerender({ modifier: 'Control', options: { initial: false } });

    // We need to trigger an event to see the change
    act(() => {
      const event = new KeyboardEvent('keydown', { ctrlKey: false });
      Object.defineProperty(event, 'getModifierState', {
        value: () => false,
      });
      window.dispatchEvent(event);
    });

    expect(result.current).toBe(false);

    act(() => {
      const event = new KeyboardEvent('keydown', { ctrlKey: true });
      Object.defineProperty(event, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(true);
  });

  it('should handle simultaneous modifier key presses', () => {
    const { result: shiftResult } = renderHook(() => useKeyModifier('Shift'));
    const { result: ctrlResult } = renderHook(() => useKeyModifier('Control'));

    act(() => {
      const event = new KeyboardEvent('keydown', {
        shiftKey: true,
        ctrlKey: true,
      });
      Object.defineProperty(event, 'getModifierState', {
        value: (modifier: string) =>
          modifier === 'Shift' || modifier === 'Control',
      });
      window.dispatchEvent(event);
    });

    expect(shiftResult.current).toBe(true);
    expect(ctrlResult.current).toBe(true);
  });

  it('should handle edge case: CapsLock toggle', () => {
    const { result } = renderHook(() => useKeyModifier('CapsLock'));

    let capsLockState = false;

    // First keydown event (CapsLock on)
    act(() => {
      const event = new KeyboardEvent('keydown');
      Object.defineProperty(event, 'getModifierState', {
        value: () => {
          capsLockState = true;
          return capsLockState;
        },
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(true);

    // Keyup event (CapsLock stays on)
    act(() => {
      const event = new KeyboardEvent('keyup');
      Object.defineProperty(event, 'getModifierState', {
        value: () => capsLockState,
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(true);

    // Second keydown event (CapsLock off)
    act(() => {
      const event = new KeyboardEvent('keydown');
      Object.defineProperty(event, 'getModifierState', {
        value: () => {
          capsLockState = false;
          return capsLockState;
        },
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(false);

    // Keyup event (CapsLock stays off)
    act(() => {
      const event = new KeyboardEvent('keyup');
      Object.defineProperty(event, 'getModifierState', {
        value: () => capsLockState,
      });
      window.dispatchEvent(event);
    });
    expect(result.current).toBe(false);
  });

  it('should handle custom event types', () => {
    const { result } = renderHook(() =>
      useKeyModifier('Meta', { events: ['mousedown', 'mouseup'] }),
    );

    act(() => {
      const mouseDownEvent = new MouseEvent('mousedown');
      Object.defineProperty(mouseDownEvent, 'getModifierState', {
        value: () => true,
      });
      window.dispatchEvent(mouseDownEvent);
    });
    expect(result.current).toBe(true);

    act(() => {
      const mouseUpEvent = new MouseEvent('mouseup');
      Object.defineProperty(mouseUpEvent, 'getModifierState', {
        value: () => false,
      });
      window.dispatchEvent(mouseUpEvent);
    });
    expect(result.current).toBe(false);
  });
});
