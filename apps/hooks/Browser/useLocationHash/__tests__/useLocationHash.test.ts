import { renderHook, act } from '@testing-library/react';
import { useLocationHash } from '../useLocationHash';
import { expect, it, describe, beforeEach } from 'vitest';

describe('useLocationHash', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('should return the current hash of the URL', () => {
    window.location.hash = '#test-hash';
    const { result } = renderHook(() => useLocationHash());
    expect(result.current).toBe('test-hash');
  });

  it('should update the hash when the URL hash changes', () => {
    const { result } = renderHook(() => useLocationHash());

    expect(result.current).toBe('');

    act(() => {
      window.location.hash = '#new-hash';
      window.dispatchEvent(new Event('hashchange'));
    });

    expect(result.current).toBe('new-hash');
  });

  it('should handle an empty hash', () => {
    window.location.hash = '';
    const { result } = renderHook(() => useLocationHash());
    expect(result.current).toBe('');
  });
});
