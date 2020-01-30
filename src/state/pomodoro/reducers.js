import * as types from './types';
import { A_MINUTE, POMODORO_INITIAL_SETTINGS } from '../../config';

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
    ...POMODORO_INITIAL_SETTINGS,
  },
};

const settingReducers = (state = initialState, { type, payload }) => {
  let duration = state.settings.focusTime * A_MINUTE;
  if (!payload) {
    duration = state.settings.focusTime * A_MINUTE;
  } else {
    duration = state.settings.shortBreakTime * A_MINUTE;
  }

  switch (type) {
    case types.START_TIMER:
      return {
        ...state,
        focusOn: !payload,
        shortBreakOn: payload,
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
    case types.SAVE_SETTINGS:
      if (state.focusOn) {
        duration = payload.focusTime * A_MINUTE;
      } else if (state.shortBreakOn) {
        duration = payload.shortBreakTime * A_MINUTE;
      } else {
        duration = payload.longBreakTime * A_MINUTE;
      }
      return {
        ...state,
        totalDuration: duration,
        settings: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default settingReducers;
