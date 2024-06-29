  import { useCallback, useEffect, useState } from 'react';

  interface UseIsTouchDeviceOptions {
    onTouchDeviceChange?: (isTouchDevice: boolean) => void;
    eventListeners?: ('resize' | 'orientationchange' | string)[];
  }

  export function useIsTouchDevice(
    options: UseIsTouchDeviceOptions = {},
  ): boolean {
    const { onTouchDeviceChange, eventListeners = ['resize'] } = options;
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const check = useCallback(() => {
      let hasTouchScreen = false;

      if ('maxTouchPoints' in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
      } else {
        const mediaQueryList = window.matchMedia('(pointer:coarse)');
        if (mediaQueryList && mediaQueryList.media === '(pointer:coarse)') {
          hasTouchScreen = Boolean(mediaQueryList.matches);
        } else {
          const UA = window.navigator.userAgent;
          hasTouchScreen =
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
        }
      }

      const newIsTouchDevice = hasTouchScreen;
      if (newIsTouchDevice !== isTouchDevice) {
        setIsTouchDevice(newIsTouchDevice);
        onTouchDeviceChange?.(newIsTouchDevice);
      }
    }, [isTouchDevice, onTouchDeviceChange]);

    const onResize = useCallback(check, [check]);

    useEffect(() => {
      onResize();
      eventListeners.forEach((eventName) => {
        window.addEventListener(eventName, onResize, { passive: true });
      });

      return () => {
        eventListeners.forEach((eventName) => {
          window.removeEventListener(eventName, onResize);
        });
      };
    }, [onResize, eventListeners]);

    return isTouchDevice;
  }
