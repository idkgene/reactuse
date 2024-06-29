import { useState, useEffect, useCallback } from 'react';

type TextDirectionValue = 'ltr' | 'rtl' | 'auto';

interface UseTextDirectionOptions {
  selector?: string;
  observe?: boolean;
  initialValue?: TextDirectionValue;
}

const defaultOptions: UseTextDirectionOptions = {
  selector: 'html',
  observe: false,
  initialValue: 'ltr',
};

export function useTextDirection(
  options: UseTextDirectionOptions = {},
): [TextDirectionValue, (value: TextDirectionValue) => void] {
  const { selector, observe, initialValue } = { ...defaultOptions, ...options };

  const getInitialDirection = useCallback((): TextDirectionValue => {
    if (initialValue) return initialValue;
    const element = document.querySelector(selector!);
    return (element?.getAttribute('dir') as TextDirectionValue) || 'ltr';
  }, [selector, initialValue]);

  const [direction, setDirection] =
    useState<TextDirectionValue>(getInitialDirection);

  const updateDirection = useCallback(() => {
    const element = document.querySelector(selector!);
    if (element) {
      const dir = element.getAttribute('dir');
      setDirection((dir as TextDirectionValue) || 'ltr');
    }
  }, [selector]);

  useEffect(() => {
    updateDirection(); // Update direction on mount and when selector changes

    if (observe) {
      const element = document.querySelector(selector!);
      if (element) {
        const observer = new MutationObserver(updateDirection);
        observer.observe(element, {
          attributes: true,
          attributeFilter: ['dir'],
        });
        return () => { observer.disconnect(); };
      }
    }
  }, [selector, observe, updateDirection]);

  const setTextDirection = useCallback(
    (value: TextDirectionValue) => {
      const element = document.querySelector(selector!);
      if (element) {
        element.setAttribute('dir', value);
        setDirection(value);
      }
    },
    [selector],
  );

  return [direction, setTextDirection];
}
