import { renderHook, act } from '@testing-library/react';
import { useShare, UseShareOptions } from './useShare';

describe('useShare', () => {
  let originalNavigator: any;
  let mockNavigator: any;

  beforeEach(() => {
    originalNavigator = global.navigator;
    mockNavigator = {
      share: jest.fn().mockResolvedValue(undefined),
    };

    Object.defineProperty(global, 'navigator', {
      value: mockNavigator,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('should return isSupported as true if navigator.share is available', () => {
    const { result } = renderHook(() => useShare());
    expect(result.current.isSupported).toBe(true);
  });

  it('should return isSupported as false if navigator.share is not available', () => {
    delete mockNavigator.share;
    const { result } = renderHook(() => useShare());
    expect(result.current.isSupported).toBe(false);
  });

  it('should call navigator.share with initial options', async () => {
    const initialOptions: UseShareOptions = {
      title: 'Hello',
      text: 'Check this out!',
      url: 'https://example.com',
      files: [new File(['content'], 'example.txt')],
    };

    const { result } = renderHook(() => useShare(initialOptions));

    await act(async () => {
      await result.current.share();
    });

    expect(mockNavigator.share).toHaveBeenCalledWith(initialOptions);
  });

  it('should call navigator.share with overridden options', async () => {
    const initialOptions: UseShareOptions = {
      title: 'Hello',
      text: 'Check this out!',
      url: 'https://example.com',
      files: [new File(['content'], 'initial.txt')],
    };

    const overrideOptions: UseShareOptions = {
      title: 'Override Title',
      text: 'Override Text',
      url: 'https://override.com',
      files: [new File(['override content'], 'override.txt')],
    };

    const { result } = renderHook(() => useShare(initialOptions));

    await act(async () => {
      await result.current.share(overrideOptions);
    });

    expect(mockNavigator.share).toHaveBeenCalledWith(overrideOptions);
  });

  it('should log a warning if Web Share API is not supported', async () => {
    console.warn = jest.fn();
    delete mockNavigator.share;
    const { result } = renderHook(() => useShare());

    await act(async () => {
      await result.current.share();
    });

    expect(console.warn).toHaveBeenCalledWith(
      'Web share API is not supported in this browser.'
    );
  });

  it('should log an error if sharing fails', async () => {
    const mockError = new Error('Test Error');
    mockNavigator.share = jest.fn().mockRejectedValue(mockError);
    console.error = jest.fn();

    const initialOptions: UseShareOptions = {
      title: 'Hello',
      text: 'Check this out!',
      url: 'https://example.com',
      files: [new File(['content'], 'example.txt')],
    };

    const { result } = renderHook(() => useShare(initialOptions));

    await act(async () => {
      await result.current.share();
    });

    expect(console.error).toHaveBeenCalledWith(
      'Error sharing content:',
      mockError
    );
  });
});
