import * as types from './types';
import { DEFAULT_SETTINGS } from '../../config';

const initialState = {
  ...DEFAULT_SETTINGS,
};

const settingsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.INIT_SETTINGS_DONE:
      return {
        ...state,
        ...payload,
      };
    case types.CHANGE_THEME_DONE:
      return {
        ...state,
        selectedTheme: payload,
      };
    case types.SAVE_SETTINGS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default settingsReducers;
