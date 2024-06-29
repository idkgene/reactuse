import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useObjectUrl } from './useObjectUrl';

type TestObjectType = File | Blob | MediaSource | null | undefined;

describe('useObjectUrl', () => {
  beforeEach(() => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return undefined for null input', () => {
    const { result } = renderHook(() => useObjectUrl(null));
    expect(result.current).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    const { result } = renderHook(() => useObjectUrl(undefined));
    expect(result.current).toBeUndefined();
  });

  it('should create and return object URL for File input', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { result } = renderHook(() => useObjectUrl(file));
    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('should create and return object URL for Blob input', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    const { result } = renderHook(() => useObjectUrl(blob));
    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
  });

  it('should handle function input', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { result } = renderHook(() => useObjectUrl(() => file));
    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('should revoke object URL on cleanup', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { unmount } = renderHook(() => useObjectUrl(file));
    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('should update URL when input changes', () => {
    const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });
    const { result, rerender } = renderHook(({ file }) => useObjectUrl(file), {
      initialProps: { file: file1 },
    });

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file1);

    act(() => {
      rerender({ file: file2 });
    });

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file2);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('should handle change from object to null', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { result, rerender } = renderHook(
      ({ input }) => useObjectUrl(input),
      {
        initialProps: { input: file },
      },
    );

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);

    act(() => {
      rerender({ input: null });
    });

    expect(result.current).toBeUndefined();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('should handle change from null to object', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const { result, rerender } = renderHook(
      ({ input }) => useObjectUrl(input),
      {
        initialProps: { input: null },
      },
    );

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ input: file });
    });

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('should handle function input that returns null', () => {
    const { result } = renderHook(() => useObjectUrl(() => null));
    expect(result.current).toBeUndefined();
  });

  it('should handle change in function input', () => {
    const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });
    const { result, rerender } = renderHook(
      ({ getFile }) => useObjectUrl(getFile),
      {
        initialProps: { getFile: () => file1 },
      },
    );

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file1);

    act(() => {
      rerender({ getFile: () => file2 });
    });

    expect(result.current).toBe('mock-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file2);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });
});
