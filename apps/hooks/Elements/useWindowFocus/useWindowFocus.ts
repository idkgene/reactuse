import { useEffect, useState } from 'react';

/**
 * A custom hook that tracks the focus state of the browser window.
 *
 * @returns {boolean} A boolean value indicating whether the window is focused.
 *
 * @example
 * const isFocused = useWindowFocus();
 * console.log(isFocused); // true if the window is focused, false otherwise
 */
export function useWindowFocus(): boolean {
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', onFocus);
      window.addEventListener('blur', onBlur);

      return () => {
        window.removeEventListener('focus', onFocus);
        window.removeEventListener('blur', onBlur);
      };
    }
  }, []);

  return focused;
}
