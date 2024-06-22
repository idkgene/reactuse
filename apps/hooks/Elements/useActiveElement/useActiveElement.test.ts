import { renderHook, act } from '@testing-library/react';
import useActiveElement from './useActiveElement';
import {
  expect,
  it,
  describe,
  beforeEach,
  vi,
} from 'vitest';

describe('useActiveElement', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
    <input id="input1" />
    <input id="input2" />
    <div id="shadow-host"></div>
    </div>
    `;
  });

  it('should return the currently active element', () => {
    const { result } = renderHook(() => useActiveElement());

    const input1 = document.getElementById('input1') as HTMLInputElement;
    const input2 = document.getElementById('input2') as HTMLInputElement;

    act(() => {
      input1?.focus();
    });
    expect(result.current).toBe(input1);

    act(() => {
      input2?.focus();
    });
    expect(result.current).toBe(input2);
  });

  it('should search for active element deeply inside shadow DOM', () => {
    const { result } = renderHook(() => useActiveElement({ deep: true }));

    const shadowHost = document.getElementById('shadow-host') as HTMLDivElement;
    const shadowRoot = shadowHost?.attachShadow({ mode: 'open' });
    const shadowInput = document.createElement('input');
    shadowInput.id = 'shadow-input';
    shadowRoot?.appendChild(shadowInput);

    act(() => {
      shadowInput.focus();
    });
    expect(result.current).toBe(shadowInput);
  });

  it('should clean up event listeners and mutation observer on unmount', () => {
    const { unmount } = renderHook(() =>
      useActiveElement({ triggerOnRemoval: true }),
    );

    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const observeSpy = vi.spyOn(MutationObserver.prototype, 'observe');
    const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'focusin',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'focusout',
      expect.any(Function),
    );
    expect(disconnectSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    observeSpy.mockRestore();
    disconnectSpy.mockRestore();
  });
});
