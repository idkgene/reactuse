import { useReducer, type Reducer, useRef } from 'react';

export interface Action { type: 'INCREMENT' }

export const reducer: Reducer<number, Action> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

export const useForceUpdate = (): (() => void) => {
  const [, dispatch] = useReducer(reducer, 0);
  const forceUpdate = useRef(() => { dispatch({ type: 'INCREMENT' }); }).current;

  return forceUpdate;
};
