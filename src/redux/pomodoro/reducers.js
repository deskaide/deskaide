import * as types from './types';
import { A_MINUTE } from '../../config';

const initialState = {
  focusOn: true,
  shortBreakOn: false,
  timerOn: false,
  timerStart: 0,
  timerTime: 0,
  position: 100,
  timerId: null,
  totalDuration: 0,
  notificationShown: false,
  settings: {
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    remindBefore: 30,
  },
};

const settingReducers = (state = initialState, { type, payload }) => {
  let duration = state.settings.focusTime * A_MINUTE;
  if (state.focusOn) {
    duration = state.settings.focusTime * A_MINUTE;
  } else if (state.shortBreakOn) {
    duration = state.settings.shortBreakTime * A_MINUTE;
  } else {
    duration = state.settings.longBreakTime * A_MINUTE;
  }
  switch (type) {
    case types.START_TIMER:
      return {
        ...state,
        totalDuration: duration,
        timerOn: true,
        timerTime: state.timerTime,
        timerStart: Date.now() - state.timerTime,
      };
    case types.UPDATE_TIMER:
      return {
        ...state,
        timerTime: Date.now() - state.timerStart,
        position: state.position - (100 * 10) / (state.totalDuration * 1000),
      };
    case types.STOP_TIMER:
      return {
        ...state,
        focusOn: !!state.shortBreakOn,
        shortBreakOn: !!state.focusOn,
        timerOn: false,
        timerId: null,
      };
    case types.RESET_TIMER:
      return {
        ...state,
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        position: 100,
      };
    case types.SAVE_TIMER_ID:
      return {
        ...state,
        timerId: payload,
      };
    case types.DELETE_TIMER_ID:
      return {
        ...state,
        timerId: null,
      };
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        notificationShown: true,
      };
    case types.RESET_NOTIFICATION:
      return {
        ...state,
        notificationShown: false,
      };
    default:
      return state;
  }
};

export default settingReducers;
