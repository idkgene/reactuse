import { useState, useEffect, useCallback } from 'react';

interface DeviceMotionState {
  acceleration: DeviceMotionEventAcceleration | null;
  accelerationIncludingGravity: DeviceMotionEventAcceleration | null;
  rotationRate: DeviceMotionEventRotationRate | null;
  interval: number;
}

interface UseDeviceMotionOptions {
  eventFilter?: (event: DeviceMotionEvent) => boolean;
}

const DEFAULT_MOTION_STATE: DeviceMotionState = {
  acceleration: null,
  accelerationIncludingGravity: null,
  rotationRate: null,
  interval: 0,
};

const ERROR_MESSAGES = {
  INVALID_WINDOW: 'Invalid window object provided',
};

function useDeviceMotion(
  options: UseDeviceMotionOptions = {},
): DeviceMotionState {
  const { eventFilter = () => true } = options;

  const [motionState, setMotionState] =
    useState<DeviceMotionState>(DEFAULT_MOTION_STATE);

  const onDeviceMotion = useCallback(
    (event: DeviceMotionEvent) => {
      if (!eventFilter(event)) return;

      setMotionState({
        acceleration: event.acceleration,
        accelerationIncludingGravity: event.accelerationIncludingGravity,
        rotationRate: event.rotationRate,
        interval: event.interval,
      });
    },
    [eventFilter],
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) {
      console.warn(ERROR_MESSAGES.INVALID_WINDOW);
      return;
    }

    window.addEventListener('devicemotion', onDeviceMotion);

    return () => {
      window.removeEventListener('devicemotion', onDeviceMotion);
    };
  }, [onDeviceMotion]);

  return motionState;
}

export { useDeviceMotion };
export type { UseDeviceMotionOptions, DeviceMotionState };
