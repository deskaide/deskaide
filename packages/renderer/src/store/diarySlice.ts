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
      const date = format(new Date(data.date), 'yyyy-MM-dd');
      const id = `${DB_ID_PREFIXES.diaryPost}#${date}`;

      console.log(id);
      try {
        const existingData = await db.getById<IDiaryPost>(id);

        console.log('----------> Start');
        console.log(existingData);
        console.log('----------> End');

        if (existingData?._id) {
          return await db.update(existingData._id, {
            ...existingData,
            ...data,
          });
        }
      } catch (error) {
        console.log(error);
      }

      console.log('After error ------>');

      console.log({ ...data, idPrefix: DB_ID_PREFIXES.diaryPost, id: date });

      return await db.save(data, DB_ID_PREFIXES.diaryPost, date);
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to save diary post');
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

      return rejectWithValue(`Diary post not found with this id: ${id}`);
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
      state.currentPost = { body: '', date: new Date().toJSON() };
      state.currentPostState = transition(
        state.currentPostState,
        ApiStates.rejected
      );
    });
  },
});

export default diarySlice.reducer;
