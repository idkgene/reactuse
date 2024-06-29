import { useReducer, type Reducer } from 'react';

interface UpdateReducerAction { type: 'increment' }

type UpdateReducerState = number;

const updateReducer: Reducer<UpdateReducerState, UpdateReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'increment':
      return (state + 1) % 1_000_000;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export const useUpdate = (): (() => void) => {
  const dispatch = useReducer(updateReducer, 0)[1];

  const update = () => {
    dispatch({ type: 'increment' });
  };

  return update;
};
