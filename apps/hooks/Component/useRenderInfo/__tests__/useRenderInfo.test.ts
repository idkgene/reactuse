import { renderHook, act } from '@testing-library/react';
import { useRenderInfo } from '../useRenderInfo';

describe('useRenderInfo', () => {
  it('should return the correct initial render information', () => {
    const { result } = renderHook(() => useRenderInfo('TestComponent'));

    expect(result.current.name).toBe('TestComponent');
    expect(result.current.renders).toBe(1);
    expect(result.current.sinceLastRender).toBe(0);
    expect(result.current.timestamp).toBeGreaterThan(0);
  });

  it('should update the render information on re-renders', async () => {
    const { result, rerender } = renderHook(() =>
      useRenderInfo('TestComponent')
    );

    const initialTimestamp = result.current.timestamp;

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    rerender();

    expect(result.current.renders).toBe(1);
    expect(result.current.sinceLastRender).toBeGreaterThanOrEqual(100);
    expect(result.current.timestamp).toBeGreaterThan(initialTimestamp);
  });

  it('should track render information independently for multiple components', () => {
    const { result: result1 } = renderHook(() => useRenderInfo('Component1'));
    const { result: result2 } = renderHook(() => useRenderInfo('Component2'));

    expect(result1.current.name).toBe('Component1');
    expect(result1.current.renders).toBe(1);

    expect(result2.current.name).toBe('Component2');
    expect(result2.current.renders).toBe(1);
  });
});
