import { renderHook, act } from '@testing-library/react';
import { useDocumentReadyState } from '../useDocumentReadyState';
import { expect, it, describe, afterEach, vi } from 'vitest';

describe('useDocumentReadyState', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the specified initial ready state', () => {
    const initialReadyState = 'loading';
    const { result } = renderHook(() =>
      useDocumentReadyState({ initialReadyState }),
    );
    expect(result.current).toBe(initialReadyState);
  });

  it('should return the current ready state', () => {
    const readyStateMock = 'interactive';
    vi.spyOn(document, 'readyState', 'get').mockReturnValue(readyStateMock);

    const { result } = renderHook(() => useDocumentReadyState());
    expect(result.current).toBe(readyStateMock);
  });

  it('should update the ready state when it changes', () => {
    const { result } = renderHook(() => useDocumentReadyState());

    act(() => {
      Object.defineProperty(document, 'readyState', {
        value: 'interactive',
        writable: true,
      });
      document.dispatchEvent(new Event('readystatechange'));
    });

    expect(result.current).toBe('interactive');

    act(() => {
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        writable: true,
      });
      document.dispatchEvent(new Event('readystatechange'));
    });

    expect(result.current).toBe('complete');
  });

  it('should call onReadyStateChange callback when the ready state changes', () => {
    const onReadyStateChangeMock = vi.fn();
    renderHook(() =>
      useDocumentReadyState({ onReadyStateChange: onReadyStateChangeMock }),
    );

    act(() => {
      Object.defineProperty(document, 'readyState', {
        value: 'interactive',
        writable: true,
      });
      document.dispatchEvent(new Event('readystatechange'));
    });

    expect(onReadyStateChangeMock).toHaveBeenCalledWith('interactive');
  });
});
