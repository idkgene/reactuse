import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useTextSelection from './useTextSelection';

describe('useTextSelection', () => {
  let mockSelection: Selection;
  let mockRange: Range;

  beforeEach(() => {
    mockRange = {
      getClientRects: vi.fn(() => [
        { top: 0, left: 0, bottom: 10, right: 10 },
        { top: 10, left: 10, bottom: 20, right: 20 },
      ]),
    } as unknown as Range;

    mockSelection = {
      toString: vi.fn(() => 'Selected Text'),
      rangeCount: 1,
      getRangeAt: vi.fn(() => mockRange),
    } as unknown as Selection;

    window.getSelection = vi.fn(() => mockSelection);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useTextSelection());

    expect(result.current).toEqual({
      text: '',
      rects: [],
      ranges: [],
      selection: null,
    });
  });

  it('should update values when selection changes', () => {
    const { result } = renderHook(() => useTextSelection());

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(result.current).toEqual({
      text: 'Selected Text',
      rects: [
        { top: 0, left: 0, bottom: 10, right: 10 },
        { top: 10, left: 10, bottom: 20, right: 20 },
      ],
      ranges: [mockRange],
      selection: mockSelection,
    });
  });

  it('should handle empty selection', () => {
    window.getSelection = vi.fn(() => null);

    const { result } = renderHook(() => useTextSelection());

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(result.current).toEqual({
      text: '',
      rects: [],
      ranges: [],
      selection: null,
    });
  });

  it('should handle selection with no ranges', () => {
    const noRangeSelection = {
      toString: vi.fn(() => 'Selected Text'),
      rangeCount: 0,
      getRangeAt: vi.fn(),
    } as unknown as Selection;

    window.getSelection = vi.fn(() => noRangeSelection);

    const { result } = renderHook(() => useTextSelection());

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(result.current).toEqual({
      text: 'Selected Text',
      rects: [],
      ranges: [],
      selection: noRangeSelection,
    });
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useTextSelection());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'selectionchange',
      expect.any(Function),
    );
  });
});
