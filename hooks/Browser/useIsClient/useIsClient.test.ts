import { renderHook, act } from '@testing-library/react';
import { useIsClient } from './useIsClient';

describe('useClient', () => {
  it('should return false on initial render', () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(false);
  });

  it('should return true after the component mounts', () => {
    const { result } = renderHook(() => useIsClient());

    act(() => {});

    expect(result.current).toBe(true);
  });

  it('should not change the value after subsequent renders', () => {
    const { result, rerender } = renderHook(() => useIsClient());

    act(() => {});

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(true);
  });
});
