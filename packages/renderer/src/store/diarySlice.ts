import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { db } from '#preload';

import type { IDiaryPost } from '../types';
import { DB_ID_PREFIXES } from '../config';

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

const _c: Partial<Record<ApiStates, States>> = {
  [ApiStates.fulfilled]: States.isSuccess,
  [ApiStates.rejected]: States.isError,
  // [ApiStates.pending]: States.isLoading,
};

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

function transition(currentState: States, action: ApiStates) {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
}

const initialState: {
  currentPost?: IDiaryPost;
  currentPostState: States;
} = {
  currentPostState: States.idle,
};

export const saveDiaryPost = createAsyncThunk(
  'diary/saveDiaryPost',
  async (data: IDiaryPost, { rejectWithValue }) => {
    try {
      if (data._id) {
        const existingData = await db.getById<IDiaryPost>(data._id);
        return await db.update(data._id, { _rev: existingData._rev, ...data });
      }

      const id = format(data.date, 'yyyy-MM-dd');

      console.log(id);

      return await db.save(data, DB_ID_PREFIXES.diaryPost, id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDiaryPostById = createAsyncThunk(
  'diary/getDiaryPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await db.getById<IDiaryPost>(id);

      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveDiaryPost.pending, (state) => {
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.pending
      );
    });
    builder.addCase(saveDiaryPost.fulfilled, (state, action) => {
      state.currentPost = action.payload;
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.fulfilled
      );
    });
    builder.addCase(saveDiaryPost.rejected, (state) => {
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.rejected
      );
    });
    builder.addCase(getDiaryPostById.pending, (state) => {
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.pending
      );
    });
    builder.addCase(getDiaryPostById.fulfilled, (state, action) => {
      state.currentPost = action.payload;
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.fulfilled
      );
    });
    builder.addCase(getDiaryPostById.rejected, (state) => {
      state.currentPost = { body: '', date: new Date() };
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.rejected
      );
    });
  },
});

export default diarySlice.reducer;
