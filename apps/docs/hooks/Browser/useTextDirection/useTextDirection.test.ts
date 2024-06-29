import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useTextDirection } from './useTextDirection';

describe('useTextDirection', () => {
  beforeEach(() => {
    document.body.innerHTML = '<html dir="ltr"><body></body></html>';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial direction', async () => {
    const { result } = renderHook(() => useTextDirection());
    await waitFor(() => {
      expect(result.current[0]).toBe('ltr');
    });
  });

  it('should use the provided initial value', async () => {
    const { result } = renderHook(() =>
      useTextDirection({ initialValue: 'rtl' }),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
    });
  });

  it('should update direction when setTextDirection is called', async () => {
    const { result } = renderHook(() => useTextDirection());
    act(() => {
      result.current[1]('rtl');
    });
    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
      expect(document.querySelector('html')?.getAttribute('dir')).toBe('rtl');
    });
  });

  it('should use custom selector', async () => {
    document.body.innerHTML = '<div id="custom" dir="rtl"></div>';
    const { result } = renderHook(() =>
      useTextDirection({ selector: '#custom' }),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
    });
  });

  it('should observe changes when observe option is true', async () => {
    const { result } = renderHook(() => useTextDirection({ observe: true }));
    await waitFor(() => {
      expect(result.current[0]).toBe('ltr');
    });

    act(() => {
      document.querySelector('html')?.setAttribute('dir', 'rtl');
    });

    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
    });
  });

  it('should use initialValue when provided', async () => {
    document.body.innerHTML = '<div id="custom" dir="ltr"></div>';
    const { result } = renderHook(() =>
      useTextDirection({ selector: '#custom', initialValue: 'rtl' }),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
    });
  });

  it('should use dir attribute from selected element when no initialValue', async () => {
    document.body.innerHTML = '<div id="custom" dir="rtl"></div>';
    const { result } = renderHook(() =>
      useTextDirection({ selector: '#custom' }),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('rtl');
    });
  });

  it('should default to "ltr" when no dir attribute and no initialValue', async () => {
    document.body.innerHTML = '<div id="custom"></div>';
    const { result } = renderHook(() =>
      useTextDirection({ selector: '#custom' }),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('ltr');
    });
  });

  it('should default to "ltr" when selector doesn\'t match and no initialValue', () => {
    document.body.innerHTML = '<div id="custom" dir="rtl"></div>';
    const { result } = renderHook(() =>
      useTextDirection({ selector: '#nonexistent' }),
    );
    expect(result.current[0]).toBe('ltr');
  });
});
