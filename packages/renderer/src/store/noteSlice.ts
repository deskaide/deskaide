import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '#preload';

import type { INotePost } from '../types';
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

export interface GetAllPostItemType<T> {
  doc: T;
  id: string;
  key: string;
  value: {
    rev: string;
  };
}

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
  currentNote?: INotePost;
  currentNoteState: States;
  allNotes: {
    data: GetAllPostItemType<INotePost>[];
    totalCount: number;
  };
} = {
  currentNoteState: States.idle,
  allNotes: {
    data: [],
    totalCount: 0,
  },
};

export const saveNote = createAsyncThunk(
  'notes/saveNote',
  async (data: INotePost, { rejectWithValue }) => {
    try {
      if (!data._id && !data.body && !data.title) {
        return;
      }
      const id = data?._id ?? `${DB_ID_PREFIXES.note}#${data.date}`;

      try {
        const existingData = await db.getById<INotePost>(id);

        if (existingData?._id) {
          return await db.update(existingData._id, {
            ...existingData,
            ...data,
          });
        }
      } catch (error) {
        console.log(error);
      }

      return await db.save(data, DB_ID_PREFIXES.note, data.date);
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to save note');
    }
  }
);

export const getNoteById = createAsyncThunk(
  'notes/getNoteById',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await db.getById<INotePost>(id);

      return result;
    } catch (error) {
      return rejectWithValue(`Note was not found with this id: ${id}`);
    }
  }
);

export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const startKey = `${DB_ID_PREFIXES.note}`;

      const result = await db.getAll({
        startKey,
        endKey: `${startKey}\uffff`,
      });

      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Note was not found');
    }
  }
);

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetCurrentNote: (state) => {
      state.currentNote = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveNote.pending, (state) => {
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.pending
      );
    });
    builder.addCase(saveNote.fulfilled, (state, action) => {
      state.currentNote = action.payload;
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.fulfilled
      );
    });
    builder.addCase(saveNote.rejected, (state) => {
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.rejected
      );
    });
    builder.addCase(getNoteById.pending, (state) => {
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.pending
      );
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      state.currentNote = action.payload;
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.fulfilled
      );
    });
    builder.addCase(getNoteById.rejected, (state) => {
      state.currentNote = { body: '', title: '', date: new Date().toJSON() };
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.rejected
      );
    });
    builder.addCase(getAllNotes.pending, (state) => {
      state.allNotes = { data: [], totalCount: 0 };
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.allNotes = action.payload;
    });
    builder.addCase(getAllNotes.rejected, (state) => {
      state.allNotes = { data: [], totalCount: 0 };
    });
  },
});

export const { resetCurrentNote } = noteSlice.actions;

export default noteSlice.reducer;
