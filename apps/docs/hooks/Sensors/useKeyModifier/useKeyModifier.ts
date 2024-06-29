import { useState, useEffect, useCallback } from 'react';

export type KeyModifier =
  | 'Alt'
  | 'AltGraph'
  | 'CapsLock'
  | 'Control'
  | 'Fn'
  | 'FnLock'
  | 'Meta'
  | 'NumLock'
  | 'ScrollLock'
  | 'Shift'
  | 'Symbol'
  | 'SymbolLock';

export interface UseKeyModifierOptions<Initial extends boolean | null> {
  events?: ('mousedown' | 'mouseup' | 'keydown' | 'keyup')[];
  initial?: Initial;
}

export const useKeyModifier = <Initial extends boolean | null = null>(
  modifier: KeyModifier,
  options: UseKeyModifierOptions<Initial> = {},
): boolean | Initial => {
  const {
    events = ['mousedown', 'mouseup', 'keydown', 'keyup'],
    initial = null as Initial,
  } = options;
  const [state, setState] = useState<boolean | Initial>(initial);

  const handleEvent = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      setState(event.getModifierState(modifier));
    },
    [modifier],
  );

  useEffect(() => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, handleEvent);
    });

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleEvent);
      });
    };
  }, [events, handleEvent]);

  return state;
};
