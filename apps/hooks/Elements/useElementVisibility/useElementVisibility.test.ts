import { renderHook, act } from '@testing-library/react';
import { useElementVisibility } from './useElementVisibility';

const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  global.IntersectionObserver = mockIntersectionObserver;
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    disconnect: mockDisconnect,
  });
});

describe('useElementVisibility', () => {
  it('should initialize with isVisible as false', () => {
    const { result } = renderHook(() => useElementVisibility());
    const [, isVisible] = result.current;
    expect(isVisible).toBe(false);
  });

  it('should create an IntersectionObserver with default options', () => {
    renderHook(() => useElementVisibility());
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { root: null, rootMargin: undefined, threshold: undefined },
    );
  });

  it('should create an IntersectionObserver with custom options', () => {
    const scrollTarget = { current: document.createElement('div') };
    const options = {
      scrollTarget,
      rootMargin: '10px',
      threshold: 0.5,
    };
    renderHook(() => useElementVisibility(options));
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { root: scrollTarget.current, rootMargin: '10px', threshold: 0.5 },
    );
  });

  it('should observe the element when ref is set', () => {
    const { result } = renderHook(() => useElementVisibility());
    const [elementRef] = result.current;

    act(() => {
      if (elementRef.current) return;
      elementRef.current = document.createElement('div');
    });

    expect(mockObserve).toHaveBeenCalledWith(elementRef.current);
  });

  it('should update isVisible when intersection changes', () => {
    const { result } = renderHook(() => useElementVisibility());
    const [elementRef] = result.current;

    act(() => {
      if (elementRef.current) return;
      elementRef.current = document.createElement('div');
    });

    const [[callback]] = mockIntersectionObserver.mock.calls;

    act(() => {
      callback([{ isIntersecting: true }]);
    });

    const [, isVisible] = result.current;
    expect(isVisible).toBe(true);

    act(() => {
      callback([{ isIntersecting: false }]);
    });

    const [, isVisibleAfter] = result.current;
    expect(isVisibleAfter).toBe(false);
  });

  it('should disconnect the observer on unmount', () => {
    const { unmount } = renderHook(() => useElementVisibility());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should not create an observer if elementRef is null', () => {
    renderHook(() => useElementVisibility());
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('should recreate the observer when options change', () => {
    const { rerender } = renderHook((props) => useElementVisibility(props), {
      initialProps: { rootMargin: '10px' },
    });

    rerender({ rootMargin: '20px' });

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
