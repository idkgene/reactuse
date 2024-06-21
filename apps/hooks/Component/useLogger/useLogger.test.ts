import { renderHook, act } from '@testing-library/react';
import { useLogger } from './useLogger';

describe('useLogger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log the mount and unmount events of a component', () => {
    const { unmount } = renderHook(() => useLogger('TestComponent'));

    expect(console.log).toHaveBeenCalledWith('[TestComponent] Mounted');

    unmount();

    expect(console.log).toHaveBeenCalledWith('[TestComponent] Updated');
  });

  it('should log the mount event with additional arguments', () => {
    renderHook(() => useLogger('TestComponent', 'arg1', 'arg2'));

    expect(console.log).toHaveBeenCalledWith(
      '[TestComponent] Mounted',
      'arg1',
      'arg2'
    );
  });

  it('should log the update event when arguments change', () => {
    const { rerender } = renderHook(
      ({ name, args }) => useLogger(name, ...args),
      {
        initialProps: { name: 'TestComponent', args: ['arg1'] },
      }
    );

    expect(console.log).toHaveBeenCalledWith('[TestComponent] Mounted', 'arg1');

    rerender({ name: 'TestComponent', args: ['arg1', 'arg2'] });

    expect(console.log).toHaveBeenCalledWith(
      '[TestComponent] Updated',
      'arg1',
      'arg2'
    );
  });

  it('should throw an error when the name argument is null', () => {
    expect(() => {
      renderHook(() => useLogger(null));
    }).toThrow('The name argument cannot be null or undefined');
  });

  it('should throw an error when the name argument is undefined', () => {
    expect(() => {
      renderHook(() => useLogger(undefined));
    }).toThrow('The name argument cannot be null or undefined');
  });
});
