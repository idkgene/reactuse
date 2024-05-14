import { renderHook, act } from '@testing-library/react';
import useToggle from '@hooks/@Utilities/useToggle';

describe('useToggle', () => {
  it('should initialize with the default value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the state when toggle function is called', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should set the state to the provided value when toggle function is called with a value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toBe(false);
  });

  it('should use the custom truthy and falsy values when provided', () => {
    const { result } = renderHook(() => useToggle('off', { truthyValue: 'on', falsyValue: 'off' }));

    expect(result.current[0]).toBe('off');

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('on');

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('off');
  });
});