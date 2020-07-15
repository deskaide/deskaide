import * as types from './types';
import { POMODORO_INITIAL_SETTINGS } from '../../config';

const initialState = {
  focusStreak: 0,
  isFocusOn: false,
  isShortBreakOn: false,
  isLongBreakOn: false,
  hasNotificationShown: false,
  time: 0,
  settings: {
    ...POMODORO_INITIAL_SETTINGS,
  },
};

const pomodoroReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_FOCUS_TIMER:
      return {
        ...state,
        isFocusOn: true,
        focusStreak: state.focusStreak + 1,
        isShortBreakOn: false,
        isLongBreakOn: false,
      };
    case types.STOP_FOCUS_TIMER:
      return {
        ...state,
        isFocusOn: false,
      };
    case types.START_SHORT_BREAK_TIMER:
      return {
        ...state,
        isFocusOn: false,
        isShortBreakOn: true,
        isLongBreakOn: false,
      };
    case types.STOP_SHORT_BREAK_TIMER:
      return {
        ...state,
        isShortBreakOn: false,
      };
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        hasNotificationShown: true,
      };
    case types.RESET_NOTIFICATION:
      return {
        ...state,
        hasNotificationShown: false,
      };
    case types.UPDATE_TIME:
      return {
        ...state,
        time: payload,
      };
    case types.SAVE_SETTINGS:
      return {
        ...state,
        settings: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default pomodoroReducers;
