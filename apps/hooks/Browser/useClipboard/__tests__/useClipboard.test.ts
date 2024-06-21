import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useClipboard';
import { expect, it, describe, beforeEach, vi } from 'vitest';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current.copiedValue).toBeNull();
    expect(typeof result.current.copy).toBe('function');
    expect(typeof result.current.cut).toBe('function');
    expect(typeof result.current.paste).toBe('function');
  });

  it('should copy text to clipboard using Clipboard API', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello, World!');
    expect(result.current.copiedValue).toBe('Hello, World!');
  });

  it('should handle Clipboard API copy failure', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Copy failed'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello, World!');
    expect(result.current.copiedValue).toBeNull();
  });

  it('should copy text to clipboard using legacy method', async () => {
    delete (navigator as any).clipboard;

    const execCommandMock = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', {
      value: execCommandMock,
    });

    const { result } = renderHook(() => useCopyToClipboard({ legacy: true }));

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(result.current.copiedValue).toBe('Hello, World!');

    execCommandMock.mockRestore();
  });

  it('should handle legacy copy failure', async () => {
    delete (navigator as any).clipboard;

    const execCommandMock = vi
      .spyOn(document, 'execCommand')
      .mockReturnValue(false);

    const { result } = renderHook(() => useCopyToClipboard({ legacy: true }));

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(result.current.copiedValue).toBeNull();

    execCommandMock.mockRestore();
  });

  it('should handle unsupported clipboard', async () => {
    delete (navigator as any).clipboard;

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(result.current.copiedValue).toBeNull();
  });

  it('should use custom copy function', async () => {
    const copyFnMock = vi.fn().mockResolvedValue(true);

    const { result } = renderHook(() =>
      useCopyToClipboard({ copyFn: copyFnMock }),
    );

    await act(async () => {
      await result.current.copy('Hello, World!');
    });

    expect(copyFnMock).toHaveBeenCalledWith('Hello, World!');
    expect(result.current.copiedValue).toBe('Hello, World!');
  });

  it('should cut text to clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.cut('Hello, World!');
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello, World!');
    expect(result.current.copiedValue).toBe('Hello, World!');
  });

  it('should handle cut failure', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Cut failed'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.cut('Hello, World!');
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello, World!');
    expect(result.current.copiedValue).toBeNull();
  });

  it('should paste text from clipboard', async () => {
    const readTextMock = vi.fn().mockResolvedValue('Hello, World!');
    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.paste();
    });

    expect(readTextMock).toHaveBeenCalled();
    expect(result.current.copiedValue).toBe('Hello, World!');
  });

  it('should handle paste failure', async () => {
    const readTextMock = vi.fn().mockRejectedValue(new Error('Paste failed'));
    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.paste();
    });

    expect(readTextMock).toHaveBeenCalled();
    expect(result.current.copiedValue).toBeNull();
  });

  it('should handle unsupported clipboard for paste', async () => {
    delete (navigator as any).clipboard;

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.paste();
    });

    expect(result.current.copiedValue).toBeNull();
  });
});
