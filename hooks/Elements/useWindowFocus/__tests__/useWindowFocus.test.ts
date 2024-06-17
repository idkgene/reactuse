import { renderHook, act } from '@testing-library/react';
import { useWindowFocus } from '../useWindowFocus';

describe('useWindowFocus', () => {
  beforeEach(() => {
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useWindowFocus());
    expect(result.current).toBe(false);
  });

  it('should add focus and blur event listeners on mount', () => {
    renderHook(() => useWindowFocus());
    expect(window.addEventListener).toHaveBeenCalledWith(
      'focus',
      expect.any(Function)
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      'blur',
      expect.any(Function)
    );
  });

  it('should remove focus and blur event listeners on unmount', () => {
    const { unmount } = renderHook(() => useWindowFocus());
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'focus',
      expect.any(Function)
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'blur',
      expect.any(Function)
    );
  });

  it('should update focused state to true when window gains focus', () => {
    const { result } = renderHook(() => useWindowFocus());
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });
    expect(result.current).toBe(true);
  });

  it('should update focused state to false when window loses focus', () => {
    const { result } = renderHook(() => useWindowFocus());
    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    expect(result.current).toBe(false);
  });
});
