import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStyleTag } from './useStyleTag';

describe('useStyleTag', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should create a style tag with initial CSS', () => {
    const { result } = renderHook(() => useStyleTag('body { color: red; }'));
    expect(document.head.innerHTML).toContain('body { color: red; }');
    expect(result.current.isLoaded).toBe(true);
  });

  it('should use custom id if provided', () => {
    const { result } = renderHook(() =>
      useStyleTag('body { color: blue; }', { id: 'custom-id' }),
    );
    expect(document.getElementById('custom-id')).not.toBeNull();
  });

  it('should apply media attribute if provided', () => {
    renderHook(() =>
      useStyleTag('body { color: green; }', {
        media: 'screen and (min-width: 800px)',
      }),
    );
    const styleElement = document.head.querySelector('style');
    expect(styleElement?.getAttribute('media')).toBe(
      'screen and (min-width: 800px)',
    );
  });

  it('should not create style tag if immediate is false', () => {
    renderHook(() =>
      useStyleTag('body { color: yellow; }', { immediate: false }),
    );
    expect(document.head.innerHTML).toBe('');
  });

  it('should not create style tag if manual is true', () => {
    renderHook(() => useStyleTag('body { color: purple; }', { manual: true }));
    expect(document.head.innerHTML).toBe('');
  });

  it('should update CSS when setCss is called', () => {
    const { result } = renderHook(() => useStyleTag('body { color: black; }'));
    act(() => {
      result.current.setCss('body { color: white; }');
    });
    expect(document.head.innerHTML).toContain('body { color: white; }');
  });

  it('should load style tag when load is called', () => {
    const { result } = renderHook(() =>
      useStyleTag('body { color: gray; }', { immediate: false }),
    );
    expect(document.head.innerHTML).toBe('');
    act(() => {
      result.current.load();
    });
    expect(document.head.innerHTML).toContain('body { color: gray; }');
    expect(result.current.isLoaded).toBe(true);
  });

  it('should not load style tag if already loaded', () => {
    const { result } = renderHook(() => useStyleTag('body { color: pink; }'));
    const initialHTML = document.head.innerHTML;
    act(() => {
      result.current.load();
    });
    expect(document.head.innerHTML).toBe(initialHTML);
  });

  it('should unload style tag when unload is called', () => {
    const { result } = renderHook(() => useStyleTag('body { color: brown; }'));
    
    // Check that the style tag is initially loaded
    expect(document.head.innerHTML).not.toBe('');
    const initialStyleElement = document.head.querySelector(
      `#${result.current.id}`
    )!;
    expect(initialStyleElement).not.toBeNull();
    expect(initialStyleElement.textContent).toBe('body { color: brown; }');
    expect(result.current.isLoaded).toBe(true);

    // Unload the style tag
    act(() => {
      result.current.unload();
    });

    // Check that the style tag has been removed
    const styleElement = document.head.querySelector(
      `#${result.current.id}`
    );
    expect(styleElement).toBeNull();
    expect(result.current.isLoaded).toBe(false);
  });

  it('should not unload style tag if not loaded', () => {
    const { result } = renderHook(() =>
      useStyleTag('body { color: orange; }', { immediate: false }),
    );
    act(() => {
      result.current.unload();
    });
    expect(result.current.isLoaded).toBe(false);
  });
  it('should clean up style tag on unmount', () => {
    const { unmount } = renderHook(() => useStyleTag('body { color: cyan; }'));
    expect(document.head.innerHTML).not.toBe('');
    unmount();
    expect(document.head.innerHTML).toBe('');
  });

  it('should not create or clean up style tag if manual is true', () => {
    const { result, unmount } = renderHook(() =>
      useStyleTag('body { color: magenta; }', { manual: true }),
    );
    expect(document.head.innerHTML).toBe('');
    act(() => {
      result.current.load();
    });
    expect(document.head.innerHTML).not.toBe('');
    unmount();
    expect(document.head.innerHTML).not.toBe('');
  });

  it('should handle multiple instances', () => {
    const { result: result1 } = renderHook(() =>
      useStyleTag('body { color: red; }'),
    );
    const { result: result2 } = renderHook(() =>
      useStyleTag('body { background: blue; }'),
    );
    expect(document.head.children.length).toBe(2);
    expect(result1.current.id).not.toBe(result2.current.id);
  });

  it('should update existing style tag when css changes', () => {
    const { result } = renderHook(() => useStyleTag('body { color: red; }'));
    expect(document.head.innerHTML).toContain('body { color: red; }');
    act(() => {
      result.current.setCss('body { color: blue; }');
    });
    expect(document.head.innerHTML).toContain('body { color: blue; }');
  });
});
