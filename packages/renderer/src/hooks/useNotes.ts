import { useEffect, useReducer, useRef, useState } from 'react';
import type { GetAllQueryResponse } from '../../../../types';
import { getAllNotes } from '../store/noteSlice';
import type { INotePost } from '../types';
import { useAppDispatch } from './useStore';

enum Status {
  'idle' = 'idle',
  'loading' = 'loading',
  'success' = 'success',
  'error' = 'error',
}

interface State {
  data?: GetAllQueryResponse<INotePost>;
  error?: Error;
  status: Status;
}

type Action =
  | { type: 'loading' }
  | { type: 'success'; payload: GetAllQueryResponse<INotePost> }
  | { type: 'error'; payload: Error };

export const useNotes = () => {
  const appDispatch = useAppDispatch();
  const cancelRequest = useRef<boolean>(false);
  const [shouldRefetch, refetchNotes] = useState({});
  const initialState: State = {
    status: Status.idle,
    error: undefined,
    data: undefined,
  };

  const noteReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, status: Status.loading };
      case 'success':
        return {
          ...initialState,
          status: Status.success,
          data: action.payload,
        };
      case 'error':
        return {
          ...initialState,
          status: Status.error,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  useEffect(() => {
    cancelRequest.current = false;
    dispatch({ type: 'loading' });

    appDispatch(getAllNotes())
      .unwrap()
      .then((data) => {
        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: 'success', payload: data });
      })
      .catch((error) => {
        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: 'error', payload: error as Error });
      });

    return () => {
      cancelRequest.current = true;
    };
  }, [shouldRefetch]);

  return {
    notes: state.data?.items ?? [],
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    refetchNotes,
  };
};
