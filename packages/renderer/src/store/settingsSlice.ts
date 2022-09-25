import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '#preload';

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
import { baseTheme as theme } from '../styles/themes';

const initialState: SettingsState = {
  isSettingsLoading: false,
  appSettings: { ...defaultAppSettings },
  pomodoroSettings: { ...defaultPomodoroSettings },
};

export const savePomodoroSettings = createAsyncThunk(
  'settings/savePomodoroSettings',
  async (data: IPomodoroSettings, { rejectWithValue }) => {
    try {
      if (data._id) {
        return await db.update(data._id, data);
      }

      return await db.save(data, DB_ID_PREFIXES.settings, APP_NAMES.pomodoro);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveAppSettings = createAsyncThunk(
  'settings/saveAppSettings',
  async (data: IAppSettings, { rejectWithValue }) => {
    try {
      const root = window.document.documentElement;
      if (data.theme === 'dark') {
        theme.colors.light.forEach((color, index) => {
          const cssVarName = `--color-text-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.dark.forEach((color, index) => {
          const cssVarName = `--color-bg-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.primary.forEach((color, index) => {
          const cssVarName = `--color-accent-${
            theme.colors.primary.length - (index + 1)
          }`;

          root.style.setProperty(cssVarName, color);
        });
      } else {
        theme.colors.light.forEach((color, index) => {
          const cssVarName = `--color-bg-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.dark.forEach((color, index) => {
          const cssVarName = `--color-text-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.primary.forEach((color, index) => {
          const cssVarName = `--color-accent-${index}`;

          root.style.setProperty(cssVarName, color);
        });
      }

      if (data._id) {
        return await db.update(data._id, data);
      }

      return await db.save(data, DB_ID_PREFIXES.settings, APP_NAMES.app);
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
      const result = await db.getById<IAppSettings>(id);
      const root = window.document.documentElement;

      if (result.theme === 'dark') {
        theme.colors.light.forEach((color, index) => {
          const cssVarName = `--color-text-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.dark.forEach((color, index) => {
          const cssVarName = `--color-bg-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.primary.forEach((color, index) => {
          const cssVarName = `--color-accent-${
            theme.colors.primary.length - (index + 1)
          }`;

          root.style.setProperty(cssVarName, color);
        });
      } else {
        theme.colors.light.forEach((color, index) => {
          const cssVarName = `--color-bg-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.dark.forEach((color, index) => {
          const cssVarName = `--color-text-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.primary.forEach((color, index) => {
          const cssVarName = `--color-accent-${index}`;

          root.style.setProperty(cssVarName, color);
        });
      }

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
      const result = await db.getById<IPomodoroSettings>(id);
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
    builder.addCase(getAppSettings.pending, (state) => {
      state.isSettingsLoading = true;
    });
    builder.addCase(getAppSettings.fulfilled, (state, action) => {
      state.appSettings = action.payload;
      state.isSettingsLoading = false;
    });
    builder.addCase(getAppSettings.rejected, (state) => {
      state.isSettingsLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setAppSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
