import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, afterEach, vi } from 'vitest';
import { useClipboardItems } from '../use-clipboard-items';

const ClipboardItem = vi.fn();

describe('useClipboardItems', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return isSupported as true when navigator.clipboard.write is available', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        write: vi.fn(),
      },
      writable: true,
    });

    const { result } = renderHook(() => useClipboardItems());
    expect(result.current.isSupported).toBe(true);
  });

  it('should return isSupported as false when navigator.clipboard.write is not available', () => {
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useClipboardItems());
    expect(result.current.isSupported).toBe(false);
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
    });
  });

  it('should set content and copied state when copy is called with source', async () => {
    const source = [
      new ClipboardItem({
        'text/plain': new Blob(['Hello, World!'], { type: 'text/plain' }),
      }),
    ];
    const { result } = renderHook(() => useClipboardItems({ source }));
    await act(async () => {
      await result.current.copy(source);
    });
    expect(result.current.content).toEqual(source);
    expect(result.current.copied).toBe(true);
  });

  it('should reset copied state after copiedDuring time', async () => {
    const source = [
      new ClipboardItem({
        'text/plain': new Blob(['Hello, World!'], { type: 'text/plain' }),
      }),
    ];
    const copiedDuring = 1000;
    const { result } = renderHook(() =>
      useClipboardItems({ source, copiedDuring }),
    );
    await act(async () => {
      await result.current.copy(source);
    });
    expect(result.current.copied).toBe(true);
    act(() => {
      vi.advanceTimersByTime(copiedDuring);
    });
    expect(result.current.copied).toBe(false);
  });

  it('should not set content and copied state when copy is called without source', async () => {
    const { result } = renderHook(() => useClipboardItems());
    await act(async () => {
      await result.current.copy([]);
    });
    expect(result.current.content).toBeNull();
    expect(result.current.copied).toBe(false);
  });

  it('should read clipboard content when read option is true', async () => {
    const clipboardContent = [
      new ClipboardItem({
        'text/plain': new Blob(['Hello, World!'], { type: 'text/plain' }),
      }),
    ];
    Object.assign(navigator.clipboard, {
      read: vi.fn().mockResolvedValue(clipboardContent),
    });
    const { result } = renderHook(() => useClipboardItems({ read: true }));
    expect(navigator.clipboard.read).toHaveBeenCalled();
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.content).toEqual(clipboardContent);
  });
});
