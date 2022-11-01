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
  allDiaryPosts: {
    data: any[];
    totalCount: number;
  };
} = {
  currentPostState: States.idle,
  allDiaryPosts: {
    data: [],
    totalCount: 0,
  },
};

export const saveDiaryPost = createAsyncThunk(
  'diary/saveDiaryPost',
  async (data: IDiaryPost, { rejectWithValue }) => {
    try {
      const date = format(new Date(data.date), 'yyyy-MM-dd');
      const id = `${DB_ID_PREFIXES.diaryPost}#${date}`;

      try {
        const existingData = await db.getById<IDiaryPost>(id);

        if (existingData?._id) {
          return await db.update(existingData._id, {
            ...existingData,
            ...data,
          });
        }
      } catch (error) {
        console.log(error);
      }

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
      return rejectWithValue(`Diary post not found with this id: ${id}`);
    }
  }
);

export const getAllDiaryPosts = createAsyncThunk(
  'diary/getAllDiaryPosts',
  async (month: string, { rejectWithValue }) => {
    try {
      console.log(month);
      const startKey = `${DB_ID_PREFIXES.diaryPost}#${month}`;

      const result = await db.getAll({
        startKey,
        endKey: `${startKey}\uffff`,
      });

      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue(`Diary post not found for this month: ${month}`);
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
    builder.addCase(getAllDiaryPosts.pending, (state) => {
      state.allDiaryPosts = { data: [], totalCount: 0 };
    });
    builder.addCase(getAllDiaryPosts.fulfilled, (state, action) => {
      console.log(action.payload);

      state.allDiaryPosts = action.payload;
    });
    builder.addCase(getAllDiaryPosts.rejected, (state) => {
      state.allDiaryPosts = { data: [], totalCount: 0 };
    });
  },
});

export default diarySlice.reducer;
