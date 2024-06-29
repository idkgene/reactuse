import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useTyping } from '../useTyping';

describe('useTyping', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useTyping());
    expect(result.current).toBe(false);
  });

  it('should return true when keydown event is triggered', () => {
    const { result } = renderHook(() => useTyping());
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);
    });
    expect(result.current).toBe(true);
  });

  it('should return false when keyup event is triggered', () => {
    const { result } = renderHook(() => useTyping());
    const event = new KeyboardEvent('keyup', { key: 'a' });
    document.dispatchEvent(event);
    expect(result.current).toBe(false);
  });
});
