import { useCallback, useEffect, useRef, useState } from 'react';

interface UseFocusOptions {
  initialValue?: boolean;
  focusVisible?: boolean;
  preventScroll?: boolean;
}

interface UseFocusReturn {
  focused: boolean;
  setFocused: (value: boolean) => void;
}

export function useFocus<T extends HTMLElement>(
  options: UseFocusOptions = {}
): UseFocusReturn {
  const {
    initialValue = false,
    focusVisible = false,
    preventScroll = false,
  } = options;
  const elementRef = useRef<T>(null);
  const [focused, setFocused] = useState(initialValue);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (focused) {
      element.focus({ preventScroll });
      if (focusVisible) {
        element.classList.add('focus-visible');
      }
    } else {
      element.blur();
      if (focusVisible) {
        element.classList.remove('focus-visible');
      }
    }
  }, [focused, focusVisible, preventScroll]);

  return {
    focused,
    setFocused,
  };
}
