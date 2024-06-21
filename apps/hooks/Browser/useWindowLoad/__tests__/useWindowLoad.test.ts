import { renderHook, waitFor, act } from '@testing-library/react';
import { useWindowLoad } from '../useWindowLoad';
import { expect, it, describe, vi } from 'vitest';

describe('useWindowLoad', () => {
  const mockReadyState = (state: string) => {
    Object.defineProperty(document, 'readyState', {
      get: () => state,
      configurable: true,
    });
  };

  beforeEach(() => {
    mockReadyState('loading');
  });

  it('should initially set loadState to "LOADING" if document is not complete', () => {
    mockReadyState('loading');

    const { result } = renderHook(() => useWindowLoad());

    expect(result.current).toBe('LOADING');
  });

  it('should set loadState to "LOADED" if document.readyState is complete initially', () => {
    mockReadyState('complete');

    const { result } = renderHook(() => useWindowLoad());

    expect(result.current).toBe('LOADED');
  });

  it('should set loadState to "LOADED" after the load event', async () => {
    mockReadyState('loading');
    const { result } = renderHook(() => useWindowLoad());

    act(() => {
      window.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(result.current).toBe('LOADED');
    });
  });

  it('should clean up the event listener after unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useWindowLoad());

    unmount();

    expect(removeSpy).toHaveBeenCalled();
    expect(removeSpy.mock.calls[0][0]).toBe('load');
    expect(removeSpy.mock.calls[0][1]).toBe(addSpy.mock.calls[0][1]);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
