import * as types from './types';
import notify from '../../utils/notify';

export const startFocusTimer = () => ({
  type: types.START_FOCUS_TIMER,
});

export const stopFocusTimer = () => ({
  type: types.STOP_FOCUS_TIMER,
});

export const skipFocusTimer = () => ({
  type: types.SKIP_FOCUS_TIMER,
});

export const startShortBreakTimer = () => ({
  type: types.START_SHORT_BREAK_TIMER,
});

export const stopShortBreakTimer = () => ({
  type: types.STOP_SHORT_BREAK_TIMER,
});

export const skipShortBreakTimer = () => ({
  type: types.SKIP_SHORT_BREAK_TIMER,
});

export const startLongBreakTimer = () => ({
  type: types.START_LONG_BREAK_TIMER,
});

export const stopLongBreakTimer = () => ({
  type: types.STOP_LONG_BREAK_TIMER,
});

export const skipLongBreakTimer = () => ({
  type: types.SKIP_LONG_BREAK_TIMER,
});

export const updateTime = (time = 0) => ({
  type: types.UPDATE_TIME,
  payload: time,
});

export const showNotification = (title = '', message = {}) => {
  notify(title, message);
  return {
    type: types.SHOW_NOTIFICATION,
  };
};

export const resetNotification = () => ({
  type: types.RESET_NOTIFICATION,
});

export const saveSettings = (settings) => ({
  type: types.SAVE_SETTINGS,
  payload: settings,
});
