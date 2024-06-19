import { useReducer, Reducer, useRef } from 'react';

/**
 * Type representing the actions that can be dispatched to the reducer.
 *
 * @typedef {Object} Action
 * @property {'INCREMENT'} type - Action type for incrementing the state.
 */
export type Action = { type: 'INCREMENT' };

/**
 * Reducer function that increments the state based on the action type.
 *
 * @param {number} state - The current state value.
 * @param {Action} action - The action object containing the type of update to perform.
 * @returns {number} The updated state value.
 */
export const reducer: Reducer<number, Action> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

/**
 * React hook that forces a component to re-render.
 *
 * @return {() => void} A function that, when called, triggers a re-render.
 *
 *  @example
 * const forceUpdate = useForceUpdate();
 *
 * const handleRefresh = () => {
 *    Perform some refresh logic
 *    foreUpdate()
 * };
 */
export const useForceUpdate = (): (() => void) => {
  const [, dispatch] = useReducer(reducer, 0);
  const forceUpdate = useRef(() => dispatch({ type: 'INCREMENT' })).current;

  return forceUpdate;
};
