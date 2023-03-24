import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '#preload';

import type { INotePost } from '../types';
import { DB_ID_PREFIXES } from '../config';
import { ApiStates, States, transition } from '../utils';
import type { GetAllQueryResponse } from '../../../../types';

export interface GetAllPostItemType<T> {
  doc: T;
  id: string;
  key: string;
  value: {
    rev: string;
  };
}

const initialState: {
  currentNote?: INotePost;
  currentNoteState: States;
  allNotes: GetAllQueryResponse<INotePost>;
} = {
  currentNoteState: States.idle,
  allNotes: {
    items: [],
    nextStartKey: '',
  },
};

export const saveNote = createAsyncThunk(
  'notes/saveNote',
  async (data: INotePost, { dispatch, rejectWithValue }) => {
    try {
      if (!data._id && !data.body && !data.title) {
        return;
      }
      const id = data?._id ?? `${DB_ID_PREFIXES.note}#${data.date}`;
      let note;

      try {
        const existingData = await db.getById<INotePost>(id);

        if (existingData?._id) {
          note = await db.update(existingData._id, {
            ...existingData,
            ...data,
          });
          if (existingData.title !== data.title) {
            dispatch(getAllNotes());
          }
          return note;
        }
      } catch (error) {
        console.log(error);
      }

      note = await db.save(data, DB_ID_PREFIXES.note, data.date);
      dispatch(getAllNotes());
      return note;
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

      const result = await db.getAll<INotePost>({
        startKey,
        endKey: `${startKey}\uffff`,
        order: 'descending',
      });

      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Note was not found');
    }
  }
);

export const searchNotes = createAsyncThunk(
  'notes/searchNotes',
  async (searchText: string, { rejectWithValue }) => {
    try {
      const result = await db.search<INotePost>({
        $and: [
          {
            _id: {
              $regex: /^note#/,
            },
          },
          {
            $or: [
              {
                title: {
                  $regex: new RegExp(`${searchText}`, 'gi'),
                },
              },
              {
                body: {
                  $regex: new RegExp(`${searchText}`, 'gi'),
                },
              },
            ],
          },
        ],
      });

      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Note was not found');
    }
  }
);

export const deleteNoteById = createAsyncThunk(
  'notes/deleteNoteById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const result = await db.deleteById(id);

      dispatch(getAllNotes());

      return result;
    } catch (error) {
      return rejectWithValue(`Note was not found with this id: ${id}`);
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
      state.currentNote = undefined;
      state.currentNoteState = transition(
        state.currentNoteState,
        ApiStates.rejected
      );
    });
    builder.addCase(getAllNotes.pending, (state) => {
      state.allNotes = { items: [] };
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.allNotes = action.payload;
    });
    builder.addCase(getAllNotes.rejected, (state) => {
      state.allNotes = { items: [] };
    });
    builder.addCase(deleteNoteById.fulfilled, (state) => {
      state.currentNote = undefined;
    });
    builder.addCase(searchNotes.fulfilled, (state, action) => {
      state.allNotes = action.payload;
    });
    builder.addCase(searchNotes.rejected, (state) => {
      state.allNotes = { items: [] };
    });
  },
});

export const { resetCurrentNote } = noteSlice.actions;

export default noteSlice.reducer;
