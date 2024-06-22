import { renderHook, act } from '@testing-library/react';
import { useDocumentVisibility } from '../useDocumentVisibility';
import {
  expect,
  it,
  describe,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';

const mockVisibilityState = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  });
};

describe('useDocumentVisibility', () => {
  beforeEach(() => {
    mockVisibilityState('visible');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial visibility state', () => {
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toBe('visible');
  });

  it('should update visibility state when visibility changes next', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    act(() => {
      mockVisibilityState('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe('hidden');
  });

  it('should update visibility state when visibility changes back to visible', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    act(() => {
      mockVisibilityState('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe('hidden');

    act(() => {
      mockVisibilityState('visible');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe('visible');
  });
});
