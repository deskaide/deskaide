import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IPomodoroSettings, SettingsState } from '../types/Settings';
import { defaultPomodoroSettings } from '../constants';

const initialState: SettingsState = {
  pomodoroSettings: { ...defaultPomodoroSettings },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPomodoroSettings: (state, action: PayloadAction<IPomodoroSettings>) => {
      state.pomodoroSettings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPomodoroSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
