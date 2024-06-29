import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useToggle } from '../use-toggle';

describe('useToggle', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle between truthy and falsy values', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should set specific values', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toBe(false);
  });

  it('should use custom truthy and falsy values', () => {
    const { result } = renderHook(() =>
      useToggle('off', { truthyValue: 'on', falsyValue: 'off' }),
    );
    expect(result.current[0]).toBe('off');

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('on');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]((prev) => !prev);
    });
    expect(result.current[0]).toBe(true);
  });

  it('should throw error if truthyValue and falsyValue are the same', () => {
    expect(() => {
      renderHook(() =>
        useToggle(true, { truthyValue: true, falsyValue: true }),
      );
    }).toThrow('truthyValue and falsyValue must be different');
  });

  it('should warn if initial value does not match truthyValue or falsyValue', () => {
    const consoleWarnMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {
        // Empty fn
      });
    const { result } = renderHook(() =>
      useToggle('invalid', { truthyValue: 'on', falsyValue: 'off' }),
    );

    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Initial value does not match truthyValue or falsyValue. Using falsyValue as default.',
    );
    expect(result.current[0]).toBe('off');

    consoleWarnMock.mockRestore();
  });

  it('should throw error if toggle function returns invalid value', () => {
    const { result } = renderHook(() => useToggle());

    expect(() => {
      act(() => {
        result.current[1](() => 'invalid' as unknown as boolean);
      });
    }).toThrow('Toggle function must return either truthyValue or falsyValue');
  });

  it('should throw error if toggle is called with invalid value', () => {
    const { result } = renderHook(() => useToggle());

    expect(() => {
      act(() => {
        result.current[1]('invalid' as unknown as boolean);
      });
    }).toThrow('Toggle value must be either truthyValue or falsyValue');
  });
});
