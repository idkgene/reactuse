import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCssVar } from './use-css-var';

describe('useCssVar', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          getPropertyValue: vi.fn().mockImplementation((prop) => {
            if (prop === '--test-prop') return 'initial';
            return '';
          }),
        }) as any,
    );
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    vi.restoreAllMocks();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useCssVar('--test-prop'));
    expect(result.current).toBe('initial');
  });

  it('should work with string prop', () => {
    const { result } = renderHook(() => useCssVar('--test-prop'));
    expect(result.current).toBe('initial');
  });

  it('should work with function prop', () => {
    const { result } = renderHook(() => useCssVar(() => '--test-prop'));
    expect(result.current).toBe('initial');
  });

  it('should use provided target', () => {
    const targetRef = { current: mockElement };
    renderHook(() => useCssVar('--test-prop', targetRef));
    expect(window.getComputedStyle).toHaveBeenCalledWith(mockElement);
  });

  it('should use document.documentElement if no target provided', () => {
    renderHook(() => useCssVar('--test-prop'));
    expect(window.getComputedStyle).toHaveBeenCalledWith(
      document.documentElement,
    );
  });

  it('should set property on target element', () => {
    const targetRef = { current: mockElement };
    renderHook(() => useCssVar('--test-prop', targetRef));
    expect(mockElement.style.getPropertyValue('--test-prop')).toBe('initial');
  });

  it('should observe changes when observe option is true', async () => {
    const targetRef = { current: mockElement };
    const { result, waitForNextUpdate } = renderHook(() =>
      useCssVar('--test-prop', targetRef, { observe: true }),
    );

    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
    vi.spyOn(window, 'MutationObserver').mockImplementation(
      () => mockObserver as any,
    );

    // Trigger a mutation
    act(() => {
      (
        window.getComputedStyle(mockElement).getPropertyValue as any
      ).mockReturnValue('new-value');
      mockElement.dispatchEvent(new Event('attributes'));
    });

    await waitForNextUpdate();

    expect(result.current).toBe('new-value');
    expect(mockObserver.observe).toHaveBeenCalledWith(mockElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('should not observe changes when observe option is false', () => {
    const targetRef = { current: mockElement };
    renderHook(() => useCssVar('--test-prop', targetRef, { observe: false }));

    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
    vi.spyOn(window, 'MutationObserver').mockImplementation(
      () => mockObserver as any,
    );

    expect(mockObserver.observe).not.toHaveBeenCalled();
  });

  it('should use initialValue from options', () => {
    const { result } = renderHook(() =>
      useCssVar('--test-prop', undefined, { initialValue: 'custom-initial' }),
    );
    expect(result.current).toBe('custom-initial');
  });

  it('should update when prop changes', async () => {
    let prop = '--test-prop-1';
    const { result, rerender } = renderHook(() => useCssVar(() => prop));
    expect(result.current).toBe('initial');
  
    prop = '--test-prop-2';
    rerender();
    
    await waitFor(() => {
      expect(window.getComputedStyle(document.documentElement).getPropertyValue).toHaveBeenCalledWith('--test-prop-2');
    });
  });

  it('should update when target changes', () => {
    const targetRef1 = { current: mockElement };
    const targetRef2 = { current: document.createElement('div') };
    const { rerender } = renderHook(
      ({ target }) => useCssVar('--test-prop', target),
      { initialProps: { target: targetRef1 } },
    );

    expect(window.getComputedStyle).toHaveBeenCalledWith(mockElement);

    rerender({ target: targetRef2 });
    expect(window.getComputedStyle).toHaveBeenCalledWith(targetRef2.current);
  });

  it('should handle null target', () => {
    const { result } = renderHook(() =>
      useCssVar('--test-prop', { current: null }),
    );
    expect(result.current).toBe('initial');
    expect(window.getComputedStyle).toHaveBeenCalledWith(
      document.documentElement,
    );
  });

  it('should handle non-HTMLElement target', () => {
    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    const targetRef = { current: svgElement };
    const { result } = renderHook(() => useCssVar('--test-prop', targetRef));
    expect(result.current).toBe('initial');
    // The style should not be set on non-HTMLElements
    expect(svgElement.style.getPropertyValue('--test-prop')).toBe('');
  });

  it('should clean up observer when component unmounts', () => {
    const targetRef = { current: mockElement };
    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
    vi.spyOn(window, 'MutationObserver').mockImplementation(
      () => mockObserver as any,
    );

    const { unmount } = renderHook(() =>
      useCssVar('--test-prop', targetRef, { observe: true }),
    );

    unmount();
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('should handle empty string as initial value', () => {
    const { result } = renderHook(() =>
      useCssVar('--test-prop', undefined, { initialValue: '' }),
    );
    expect(result.current).toBe('initial'); // Because getComputedStyle mock returns 'initial'
  });

  it('should trim the value from getComputedStyle', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: vi.fn().mockReturnValue('  trimmed-value  '),
    } as any);

    const { result } = renderHook(() => useCssVar('--test-prop'));
    expect(result.current).toBe('trimmed-value');
  });
});
