import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './state/store';
import './i18n';
import App from './App';
import {
  pomodoroSettingsId,
  appSettingsId,
  DEFAULT_SETTINGS,
  POMODORO_INITIAL_SETTINGS,
} from './config';
import { pomodoroActions } from './state/pomodoro';
import { settingsActions } from './state/settings';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const store = createStore({});

async function init() {
  let pomodoroSettings = {};
  let appSettings = {};
  const savedPomodoroSettings = ipcRenderer.sendSync(
    'GET_BY_ID',
    pomodoroSettingsId
  );
  const savedAppSettings = ipcRenderer.sendSync('GET_BY_ID', appSettingsId);

  if (!savedPomodoroSettings) {
    pomodoroSettings = POMODORO_INITIAL_SETTINGS;
  } else {
    pomodoroSettings = savedPomodoroSettings;
  }

  if (!savedAppSettings) {
    appSettings = DEFAULT_SETTINGS;
  } else {
    appSettings = savedAppSettings;
  }

  store.dispatch(pomodoroActions.saveSettings(pomodoroSettings));
  store.dispatch(settingsActions.save(appSettings));
}

init();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
