import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  format,
  differenceInCalendarMonths,
  addMonths,
  subMonths,
  isAfter,
} from 'date-fns';
import { db } from '#preload';

import type { IDiaryPost } from '../types';
import { DB_ID_PREFIXES } from '../config';
import { ApiStates, States, transition } from '../utils';
import type { GetAllQueryResponse } from '../../../../types';

const initialState: {
  selectedDate: string;
  selectedMonth: string;
  currentPost: IDiaryPost | null;
  currentPostState: States;
  allDiaryPosts: GetAllQueryResponse<IDiaryPost>;
} = {
  currentPost: null,
  currentPostState: States.idle,
  allDiaryPosts: {
    items: [],
    nextStartKey: '',
  },
  selectedDate: new Date().toJSON(),
  selectedMonth: new Date().toJSON(),
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
      const startKey = `${DB_ID_PREFIXES.diaryPost}#${month}`;

      const result = await db.getAll<IDiaryPost>({
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
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      const currentDate = new Date();
      const currentSelectedDate = new Date(state.selectedDate);
      const selectedMonth = new Date(action.payload);

      state.selectedMonth = action.payload;

      const diffInMonths = differenceInCalendarMonths(
        currentSelectedDate,
        selectedMonth
      );
      if (diffInMonths < 0) {
        const nextDate = addMonths(currentSelectedDate, diffInMonths * -1);

        state.selectedDate = isAfter(currentDate, nextDate)
          ? nextDate.toJSON()
          : currentDate.toJSON();
      }
      if (diffInMonths > 0) {
        state.selectedDate = subMonths(
          currentSelectedDate,
          diffInMonths
        ).toJSON();
      }
    },
  },
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
      state.allDiaryPosts = { items: [] };
    });
    builder.addCase(getAllDiaryPosts.fulfilled, (state, action) => {
      state.allDiaryPosts = action.payload;
    });
    builder.addCase(getAllDiaryPosts.rejected, (state) => {
      state.allDiaryPosts = { items: [] };
    });
  },
});

export const { setSelectedDate, setSelectedMonth } = diarySlice.actions;

export default diarySlice.reducer;
