import * as types from './types';

const initialState = {
  selectedTheme: 'dark',
};

const settingReducers = (state = initialState, { type, payload }) => {
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
    default:
      return state;
  }
};

export default settingReducers;
