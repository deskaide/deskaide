export enum ApiStates {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export enum States {
  idle = 'idle',
  isLoading = 'loading',
  isSuccess = 'success',
  isError = 'error',
}

export type StateTransition = Record<
  States,
  Partial<Record<ApiStates, States>>
>;

const transitions: StateTransition = {
  [States.idle]: {
    [ApiStates.pending]: States.isLoading,
  },
  [States.isLoading]: {
    [ApiStates.fulfilled]: States.isSuccess,
    [ApiStates.rejected]: States.isError,
  },
  [States.isError]: {
    [ApiStates.pending]: States.isLoading,
  },
  [States.isSuccess]: {
    [ApiStates.pending]: States.isLoading,
  },
};

export function transition(currentState: States, action: ApiStates) {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
}
