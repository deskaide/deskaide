import * as types from './types';

export const initSettings = () => ({
  type: types.INIT_SETTINGS,
});

export const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: theme,
});
