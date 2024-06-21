import { renderHook, act } from '@testing-library/react';
import { watchAtMost } from '../watchAtMost';

describe('watchAtMost', () => {
  it('should trigger the callback at most the specified number of times', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(
      ({ source, options }) => watchAtMost(source, callback, options),
      {
        initialProps: { source: 'initial', options: { count: 2 } },
      }
    );

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.count).toBe(0);

    rerender({ source: 'updated1', options: { count: 2 } });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('updated1');
    expect(result.current.count).toBe(1);

    rerender({ source: 'updated2', options: { count: 2 } });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('updated2');
    expect(result.current.count).toBe(2);

    rerender({ source: 'updated3', options: { count: 2 } });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(result.current.count).toBe(2);
  });

  it('should stop triggering the callback when stop is called', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(
      ({ source, options }) => watchAtMost(source, callback, options),
      {
        initialProps: { source: 'initial', options: { count: 3 } },
      }
    );

    rerender({ source: 'updated1', options: { count: 3 } });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.count).toBe(1);

    act(() => {
      result.current.stop();
    });

    rerender({ source: 'updated2', options: { count: 3 } });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.count).toBe(1);
  });
});
