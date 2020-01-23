import * as types from './types';

export const startTimer = (shortBreakOn = false) => ({
  type: types.START_TIMER,
  payload: shortBreakOn,
});

export const stopTimer = id => {
  clearInterval(id);
  return {
    type: types.STOP_TIMER,
  };
};

export const updateTimer = () => ({
  type: types.UPDATE_TIMER,
});

export const resetTimer = () => ({
  type: types.RESET_TIMER,
});

export const saveTimerId = id => ({
  type: types.SAVE_TIMER_ID,
  payload: id,
});

export const showNotification = ({ body, icon }) => {
  new Notification('', {
    body,
    icon,
  });
  return {
    type: types.SHOW_NOTIFICATION,
  };
};

export const resetNotification = () => ({
  type: types.RESET_NOTIFICATION,
});

export const saveSettings = settings => ({
  type: types.SAVE_SETTINGS,
  payload: settings,
});
