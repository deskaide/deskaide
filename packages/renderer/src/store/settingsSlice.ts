import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type {
  IAppSettings,
  IPomodoroSettings,
  SettingsState,
} from '../types/Settings';
import {
  APP_NAMES,
  DB_ID_PREFIXES,
  defaultAppSettings,
  defaultPomodoroSettings,
} from '../config';

const initialState: SettingsState = {
  appSettings: { ...defaultAppSettings },
  pomodoroSettings: { ...defaultPomodoroSettings },
};

export const savePomodoroSettings = createAsyncThunk(
  'settings/savePomodoroSettings',
  async (data: IPomodoroSettings, { rejectWithValue }) => {
    try {
      if (data._id) {
        return await window.db.update(data._id, data);
      }

      return await window.db.save(
        data,
        DB_ID_PREFIXES.settings,
        APP_NAMES.pomodoro
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveAppSettings = createAsyncThunk(
  'settings/saveAppSettings',
  async (data: IAppSettings, { rejectWithValue }) => {
    try {
      if (data._id) {
        return await window.db.update(data._id, data);
      }
      return await window.db.save(data, DB_ID_PREFIXES.settings, APP_NAMES.app);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAppSettings = createAsyncThunk(
  'settings/getAppSettings',
  async (_, { rejectWithValue }) => {
    try {
      const id = `${DB_ID_PREFIXES.settings}#${APP_NAMES.app}`;
      const result = await window.db.getById<IAppSettings>(id);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPomodoroSettings = createAsyncThunk(
  'settings/getPomodoroSettings',
  async (_, { rejectWithValue }) => {
    try {
      const id = `${DB_ID_PREFIXES.settings}#${APP_NAMES.pomodoro}`;
      const result = await window.db.getById<IPomodoroSettings>(id);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSettings = createAsyncThunk(
  'settings/getAllSettings',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(getAppSettings());
      await dispatch(getPomodoroSettings());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppSettings: (state, action: PayloadAction<IAppSettings>) => {
      state.appSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(savePomodoroSettings.fulfilled, (state, action) => {
      state.pomodoroSettings = action.payload;
    });
    builder.addCase(getPomodoroSettings.fulfilled, (state, action) => {
      state.pomodoroSettings = action.payload;
    });
    builder.addCase(saveAppSettings.fulfilled, (state, action) => {
      state.appSettings = action.payload;
    });
    builder.addCase(getAppSettings.fulfilled, (state, action) => {
      state.appSettings = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setAppSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
