import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum TimerType {
  'POMODORO_TIMER',
  'BREAK_TIMER',
}

export interface TimerState {
  currentFocusTime: number;
  currentBreakTime: number;
  timerType: TimerType;
}

const initialState: TimerState = {
  currentFocusTime: 0,
  currentBreakTime: 0,
  timerType: TimerType.POMODORO_TIMER,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCurrentFocusTime: (state, action: PayloadAction<number>) => {
      state.currentFocusTime = action.payload;
    },
    setCurrentBreakTime: (state, action: PayloadAction<number>) => {
      state.currentBreakTime = action.payload;
    },
    setTimerType: (state, action: PayloadAction<TimerType>) => {
      state.timerType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentFocusTime, setCurrentBreakTime, setTimerType } =
  timerSlice.actions;

export default timerSlice.reducer;
