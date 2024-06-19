import { renderHook, act } from '@testing-library/react';
import { useTextSelection } from './useTextSelection';

describe('useTextSelection', () => {
  let mockWindow: Window;
  let mockSelection: Selection;

  beforeEach(() => {
    mockWindow = {
      getSelection: jest.fn(),
    } as unknown as Window;

    mockSelection = {
      toString: jest.fn().mockReturnValue('selected text'),
      getRangeAt: jest.fn(),
      rangeCount: 2,
    } as unknown as Selection;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state when there is no selection', () => {
    (mockWindow.getSelection as jest.Mock).mockReturnValueOnce(null);

    const { result } = renderHook(() =>
      useTextSelection({ window: mockWindow })
    );

    expect(result.current.text).toBe('');
    expect(result.current.rects).toEqual([]);
    expect(result.current.ranges).toEqual([]);
    expect(result.current.selection).toBeNull();
  });

  it('should update state when selection changes', () => {
    const mockRange = {
      getClientRects: jest.fn().mockReturnValueOnce(['rect1', 'rect2']),
    };
    (mockSelection.getRangeAt as jest.Mock).mockImplementation(index => {
      return index < mockSelection.rangeCount ? mockRange : null;
    });
    (mockWindow.getSelection as jest.Mock).mockReturnValueOnce(mockSelection);

    const { result } = renderHook(() =>
      useTextSelection({ window: mockWindow })
    );

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(result.current.text).toBe('selected text');
    expect(result.current.rects).toEqual(['rect1', 'rect2']);
    expect(result.current.ranges).toHaveLength(2);
    expect(result.current.selection).toBe(mockSelection);
  });

  it('should add and remove selectionchange event listener', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useTextSelection({ window: mockWindow })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'selectionchange',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'selectionchange',
      expect.any(Function)
    );
  });

  it('should handle window object not being provided', () => {
    const { result } = renderHook(() => useTextSelection());

    expect(result.current.text).toBe('');
    expect(result.current.rects).toEqual([]);
    expect(result.current.ranges).toEqual([]);
    expect(result.current.selection).toBeNull();
  });
});
