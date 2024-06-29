import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useBoolean } from '../use-boolean';

describe('useBoolean', () => {
  it('should initialize with the default value of false', () => {
    const { result } = renderHook(() => useBoolean());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it('should toggle the boolean value when toggle function is called', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, toggle] = result.current;

    act(() => {
      toggle();
    });

    const [value] = result.current;
    expect(value).toBe(true);

    act(() => {
      toggle();
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(false);
  });

  it('should update the boolean value when setValue function is called', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, , setValue] = result.current;

    act(() => {
      setValue(true);
    });

    const [value] = result.current;
    expect(value).toBe(true);

    act(() => {
      setValue(false);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(false);
  });

  it('should update the boolean value based on the previous value when setValue function is called with a callback', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, , setValue] = result.current;

    act(() => {
      setValue((prevValue) => !prevValue);
    });

    const [value] = result.current;
    expect(value).toBe(true);

    act(() => {
      setValue((prevValue) => !prevValue);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(false);
  });
});
