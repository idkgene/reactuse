import React from 'react';

type UseSwipeTarget =
  | React.RefObject<Element | null>
  | (() => Element)
  | Element;
export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';
export type UseSwipeHandledEvents = React.MouseEvent | TouchEvent | MouseEvent;
export type UseSwipeCallback = (value: UseSwipeReturn) => void;
export interface UseSwipePosition { x: number; y: number }

export interface UseSwipeReturn {
  direction: UseSwipeDirection;
  isSwiping: boolean;
  distanceX: number;
  distanceY: number;
  percent: number;
  posStart: UseSwipePosition;
  posEnd: UseSwipePosition;
  event: UseSwipeHandledEvents | null;
}

export interface UseSwipeActions {
  onSwipeStart?: UseSwipeCallback;
  onSwiping?: UseSwipeCallback;
  onSwiped?: UseSwipeCallback;
  onSwipedLeft?: UseSwipeCallback;
  onSwipedRight?: UseSwipeCallback;
  onSwipedUp?: UseSwipeCallback;
  onSwipedDown?: UseSwipeCallback;
}

export type UseSwipeOptions = {
  threshold: number;
  preventScrollOnSwipe: boolean;
  track: ['mouse', 'touch'];
  directions: UseSwipeDirection[];
} & UseSwipeActions;

export interface UseSwipe {
  <Target extends UseSwipeTarget>(
    target: Target,
    callback?: UseSwipeCallback,
  ): UseSwipeReturn;

  <Target extends UseSwipeTarget>(
    target: Target,
    options?: Partial<UseSwipeOptions>,
  ): UseSwipeReturn;

  <Target extends UseSwipeTarget>(
    callback: UseSwipeCallback,
    target?: never,
  ): UseSwipeReturn & { ref: React.RefObject<Target> };

  <Target extends UseSwipeTarget>(
    options: Partial<UseSwipeOptions>,
    target?: never,
  ): UseSwipeReturn & { ref: React.RefObject<Target> };
}

const USE_SWIPE_DEFAULT_OPTIONS: UseSwipeOptions = {
  threshold: 10,
  preventScrollOnSwipe: false,
  track: ['mouse', 'touch'],
  directions: ['left', 'right', 'up', 'down'],
};

const USE_SWIPE_DEFAULT_STATE: UseSwipeReturn = {
  isSwiping: false,
  direction: 'none',
  posStart: { x: 0, y: 0 },
  posEnd: { x: 0, y: 0 },
  distanceX: 0,
  distanceY: 0,
  percent: 0,
  event: null,
};

const getElement = (target: UseSwipeTarget) => {
  if (typeof target === 'function') {
    return target();
  }

  if (target instanceof Element) {
    return target;
  }

  return target.current;
};

const getUseSwipeOptions = (options: UseSwipeOptions | undefined) => {
  return {
    ...USE_SWIPE_DEFAULT_OPTIONS,
    ...options,
  };
};

const getSwipeDirection = (
  deltaX: number,
  deltaY: number,
): UseSwipeDirection => {
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'left' : 'right';
  }
  return deltaY > 0 ? 'up' : 'down';
};

export const useSwipe = ((...params: any[]) => {
  const target = (
    params[0] instanceof Function || !('current' in params[0])
      ? undefined
      : params[0]
  ) as UseSwipeTarget | undefined;
  const userOptions = (
    target
      ? typeof params[1] === 'object'
        ? params[1]
        : { onSwiped: params[1] }
      : typeof params[0] === 'object'
        ? params[0]
        : { onSwiped: params[0] }
  ) as UseSwipeOptions | undefined;

  const options = getUseSwipeOptions(userOptions);
  const internalRef = React.useRef<Element>(null);

  const [value, setValue] = React.useState<UseSwipeReturn>(
    USE_SWIPE_DEFAULT_STATE,
  );

  const getSwipePositions = (event: UseSwipeHandledEvents) => {
    const element = target ? getElement(target) : internalRef.current;
    if (!element) return { x: 0, y: 0 }; // ?

    const isTouch = 'touches' in event;
    const { clientX, clientY } = isTouch ? event.touches[0] : event;
    const boundingRect = element.getBoundingClientRect();
    const x = Math.round(clientX - boundingRect.left);
    const y = Math.round(clientY - boundingRect.top);
    return { x, y };
  };

  const getPercent = (
    deltaX: number,
    deltaY: number,
  ): Record<UseSwipeDirection, number> => {
    const element = target ? getElement(target) : internalRef.current;
    if (!element) return { none: 0, down: 0, left: 0, right: 0, up: 0 }; // ?
    const { width, height } = element.getBoundingClientRect();
    return {
      none: 0,
      left: Math.min(Math.round((Math.abs(deltaX) * 100) / width), 100),
      right: Math.min(Math.round((Math.abs(deltaX) * 100) / width), 100),
      up: Math.min(Math.round((Math.abs(deltaY) * 100) / height), 100),
      down: Math.min(Math.round((Math.abs(deltaY) * 100) / height), 100),
    };
  };

  const onMove = (event: UseSwipeHandledEvents) => {
    setValue((prevValue) => {
      if (options.preventScrollOnSwipe) {
        event.preventDefault();
        event.stopPropagation();
      }

      const { x, y } = getSwipePositions(event);
      const distanceX = Math.round(prevValue.posStart.x - x);
      const distanceY = Math.round(prevValue.posStart.y - y);
      const absX = Math.abs(distanceX);
      const absY = Math.abs(distanceY);
      const isThresholdExceeded = Math.max(absX, absY) >= options.threshold;
      const isSwiping = prevValue.isSwiping || isThresholdExceeded;
      const direction = isSwiping
        ? getSwipeDirection(distanceX, distanceY)
        : 'none';
      if (!options.directions.includes(direction)) return prevValue;

      const percent = getPercent(distanceX, distanceY);
      const newValue: UseSwipeReturn = {
        ...prevValue,
        isSwiping,
        direction,
        event,
        distanceX,
        distanceY,
        posEnd: { x, y },
        percent: percent[direction],
      };

      options.onSwiping?.(newValue);

      return newValue;
    });
  };

  const onFinish = (event: UseSwipeHandledEvents) => {
    setValue((prevValue) => {
      const newValue: UseSwipeReturn = {
        ...prevValue,
        event,
        isSwiping: false,
      };

      options.onSwiped?.(newValue);

      const directionCallbacks = {
        left: options.onSwipedLeft,
        right: options.onSwipedRight,
        up: options.onSwipedUp,
        down: options.onSwipedDown,
      };

      if (newValue.direction === 'none') return newValue;

      const callback = directionCallbacks[newValue.direction];
      callback?.(newValue);

      return newValue;
    });

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
  };

  const onStart = (event: UseSwipeHandledEvents) => {
    event.preventDefault();

    const isTouch = 'touches' in event;
    if (options.track.includes('mouse') && !isTouch) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onFinish, { once: true });
    }
    if (options.track.includes('touch') && isTouch) {
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onFinish, { once: true });
    }

    const { x, y } = getSwipePositions(event);

    setValue((prevValue) => {
      const newValue: UseSwipeReturn = {
        ...prevValue,
        event,
        posStart: { x, y },
        direction: 'none',
      };
      options.onSwipeStart?.(newValue);
      return newValue;
    });
  };

  React.useEffect(() => {
    const element = target ? getElement(target) : internalRef.current;
    if (!element) return;

    if (options.track.includes('mouse')) {
      // @ts-ignore
      // element.addEventListener('mousedown', (event) <-- has Event type, not MouseEvent
      element.addEventListener('mousedown', onStart);
    }

    if (options.track.includes('touch')) {
      // @ts-ignore
      element.addEventListener('touchstart', onStart);
    }

    return () => {
      // @ts-ignore
      element.removeEventListener('mousedown', onStart);
      // @ts-ignore
      element.removeEventListener('touchstart', onStart);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onFinish);
      document.removeEventListener('touchend', onFinish);
    };
  }, []);

  if (target) return { ...value };
  return { ...value, ref: internalRef };
}) as UseSwipe;
