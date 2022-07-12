import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TimerType } from '../../../../types';

export interface TimerState {
  currentFocusTime: number;
  timerType: TimerType;
}

const initialState: TimerState = {
  currentFocusTime: 0,
  timerType: TimerType.PomodoroTimer,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCurrentFocusTime: (state, action: PayloadAction<number>) => {
      state.currentFocusTime = action.payload;
    },
    setTimerType: (state, action: PayloadAction<TimerType>) => {
      state.timerType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentFocusTime, setTimerType } = timerSlice.actions;

export default timerSlice.reducer;
