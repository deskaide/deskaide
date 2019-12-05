import * as types from './types';

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
    focusTime: 25 * 60 * 1000,
    shortBreakTime: 10 * 60 * 1000,
    longBreakTime: 15 * 60 * 1000,
    remindBefore: 30 * 1000,
  },
};

const settingReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_TIMER:
      return {
        ...state,
        totalDuration: state.focusOn
          ? state.settings.focusTime
          : state.shortBreakOn
          ? state.settings.shortBreakTime
          : state.settings.longBreakTime,
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
