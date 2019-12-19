import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './state/store';
import './i18n';
import App from './App';
import GlobalStyle from './views/styles/GlobalStyle';
import SettingService from './services/SettingService';

const setting = new SettingService().getSetting();
const initialState = {
  setting,
};

const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
