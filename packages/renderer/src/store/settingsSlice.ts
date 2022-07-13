import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  IAppSettings,
  IPomodoroSettings,
  SettingsState,
} from '../types/Settings';
import { defaultAppSettings, defaultPomodoroSettings } from '../config';

const initialState: SettingsState = {
  appSettings: { ...defaultAppSettings },
  pomodoroSettings: { ...defaultPomodoroSettings },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppSettings: (state, action: PayloadAction<IAppSettings>) => {
      state.appSettings = action.payload;
    },
    setPomodoroSettings: (state, action: PayloadAction<IPomodoroSettings>) => {
      state.pomodoroSettings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPomodoroSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
