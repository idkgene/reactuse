import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useResetState } from '../use-reset-state';

describe('useResetState', () => {
  it('should initialize state with the initial value', () => {
    const initialState = 'initial';
    const { result } = renderHook(() => useResetState(initialState));
    const [state] = result.current;

    expect(state).toBe(initialState);
  });

  it('should initialize state with the result of the initial function', () => {
    const initialState = () => 'initial';
    const { result } = renderHook(() => useResetState(initialState));
    const [state] = result.current;

    expect(state).toBe('initial');
  });

  it('should update state when setState is called', () => {
    const initialState = 'initial';
    const { result } = renderHook(() => useResetState(initialState));
    const [, setState] = result.current;

    act(() => {
      setState('updated');
    });

    const [state] = result.current;
    expect(state).toBe('updated');
  });

  it('should reset state to the initial value when resetState is called', () => {
    const initialState = 'initial';
    const { result } = renderHook(() => useResetState(initialState));
    const [, setState, resetState] = result.current;

    act(() => {
      setState('updated');
    });

    act(() => {
      resetState();
    });

    const [state] = result.current;
    expect(state).toBe(initialState);
  });

  it('should reset state to the result of the initial function when resetState is called', () => {
    const initialState = () => 'initial';
    const { result } = renderHook(() => useResetState(initialState));
    const [, setState, resetState] = result.current;

    act(() => {
      setState('updated');
    });

    act(() => {
      resetState();
    });

    const [state] = result.current;
    expect(state).toBe('initial');
  });
});
