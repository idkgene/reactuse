import { useEffect, useState } from 'react';

export function useWindowFocus(): boolean {
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const onFocus = () => { setFocused(true); };
    const onBlur = () => { setFocused(false); };

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
