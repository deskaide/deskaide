import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './state/store';
import './i18n';
import App from './App';
import GlobalStyle from './views/styles/GlobalStyle';
import { pomodoroSettingsId, POMODORO_INITIAL_SETTINGS } from './config';
import { pomodoroActions } from './state/pomodoro';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const store = createStore({});

async function init() {
  let pomodoroSettings = {};
  const settings = ipcRenderer.sendSync('GET_BY_ID', pomodoroSettingsId);

  if (!settings) {
    pomodoroSettings = POMODORO_INITIAL_SETTINGS;
  } else {
    pomodoroSettings = settings;
  }

  store.dispatch(pomodoroActions.saveSettings(pomodoroSettings));
}

init();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
