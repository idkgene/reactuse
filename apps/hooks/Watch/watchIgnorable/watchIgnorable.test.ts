import { renderHook, act, render } from '@testing-library/react';
import { useIgnorableWatch } from './watchIgnorable';

describe('useIgnorableWatch', () => {
  it('should immediately call the callback with the initial value when immediate is true', () => {
    const callback = jest.fn();
    renderHook(() => useIgnorableWatch(0, callback, { immediate: true }));
    expect(callback).toHaveBeenCalledWith(0, undefined);
  })
}