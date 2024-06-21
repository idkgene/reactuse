import { renderHook, act } from '@testing-library/react';
import { useForceUpdate } from './useForceUpdate';

describe('useForceUpdate', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useForceUpdate());
    expect(typeof result.current).toBe('function');
  });

  it('should force a re-render when the returned function is called', () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useForceUpdate();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current();
    });

    expect(renderCount).toBe(2);
  });

  it('should return a stable function across re-renders', () => {
    const { result, rerender } = renderHook(() => useForceUpdate());
    const forceUpdateFn = result.current;

    rerender();

    expect(result.current).toBe(forceUpdateFn);
  });
});
