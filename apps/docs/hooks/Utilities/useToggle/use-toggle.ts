import { useCallback, useState } from 'react';
import { type UseToggleOptions } from '../utilities';

export function useToggle<Truthy = true, Falsy = false>(
  initialValue: Truthy | Falsy = false as Falsy,
  options: UseToggleOptions<Truthy, Falsy> = {},
): [
  Truthy | Falsy,
  (value?: Truthy | Falsy | ((prev: Truthy | Falsy) => Truthy | Falsy)) => void,
] {
  const { truthyValue = true as Truthy, falsyValue = false as Falsy } = options;

  if (Object.is(truthyValue, falsyValue)) {
    throw new Error('truthyValue and falsyValue must be different');
  }

  const [state, setState] = useState<Truthy | Falsy>(() => {
    if (initialValue !== truthyValue && initialValue !== falsyValue) {
      console.warn(
        'Initial value does not match truthyValue or falsyValue. Using falsyValue as default.',
      );
      return falsyValue;
    }
    return initialValue;
  });

  const toggle = useCallback(
    (value?: Truthy | Falsy | ((prev: Truthy | Falsy) => Truthy | Falsy)) => {
      if (typeof value === 'function') {
        setState((prevState) => {
          const newState = (value as (prev: Truthy | Falsy) => Truthy | Falsy)(
            prevState,
          );
          if (newState !== truthyValue && newState !== falsyValue) {
            throw new Error(
              'Toggle function must return either truthyValue or falsyValue',
            );
          }
          return newState;
        });
      } else if (value !== undefined) {
        if (value !== truthyValue && value !== falsyValue) {
          throw new Error(
            'Toggle value must be either truthyValue or falsyValue',
          );
        }
        setState(value);
      } else {
        setState((prevState): Truthy | Falsy =>
          prevState === truthyValue ? falsyValue : truthyValue,
        );
      }
    },
    [truthyValue, falsyValue],
  );

  return [state, toggle];
}
