import * as types from './types';

const initialState = {
  theme: {
    isDark: false,
  },
};

const settingReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.INIT_SETTINGS_DONE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default settingReducers;
